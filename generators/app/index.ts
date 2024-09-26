import Generator from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';
import * as fs from 'fs';
import { AppService } from '../../lib/core/app.service.js';
import { JavaGenerator, TestSuiteData } from '../../lib/java-generator/java-generator.js';
import { Domain } from '../../lib/core/domain-model.js';
import { JavaGeneratorConfig } from '../../lib/java-generator/java-generator-config.js';

export default class extends Generator {
  answers: { modelFile: string; outputDir: string; configFile: string } = { modelFile: '', outputDir: '', configFile: '' };
  modelFile: string = '';
  appService?: AppService = new AppService();
  javaGenerator?: JavaGenerator = new JavaGenerator();
  domainModel?: Domain;
  testSuiteData?: TestSuiteData;
  javaGeneratorConfig?: JavaGeneratorConfig;

  async prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the epic ${chalk.red('ddd')} generator!`));

    this.answers = (await this.prompt([
      {
        type: 'input',
        name: 'modelFile',
        message: 'What`s the path to the model?',
        default: './domain-model.xml',
      },
      {
        type: 'input',
        name: 'outputDir',
        message: 'What`s the output dir?',
        default: './src/test/java',
      },
      {
        type: 'input',
        name: 'configFile',
        message: 'What`s the path to the config?',
        default: './generator-config.json',
      },
    ])) as any;
  }

  async configuring() {
    this.destinationRoot(this.answers.outputDir);

    const modelFileContent = fs.readFileSync(this.answers.modelFile, 'utf8');
    this.domainModel = await this.appService?.createDomainModelFromXML(modelFileContent);

    const javaConfigFile = fs.readFileSync(this.answers.configFile, 'utf-8');
    this.javaGeneratorConfig = JSON.parse(javaConfigFile);

    if (this.domainModel && this.javaGeneratorConfig) {
      this.testSuiteData = this.javaGenerator?.generateTestSuiteData(this.domainModel, this.javaGeneratorConfig);
    }
  }

  writing() {
    if (this.testSuiteData?.domainTests) {
      for (const domainTestData of this.testSuiteData.domainTests) {
        const filepath = `${domainTestData.package.replaceAll('.', '/')}/${domainTestData.domainName}DomainTests.java`;

        this.fs.copyTpl(this.templatePath('domain-test.java.tpl'), this.destinationPath(filepath), {
          domainTest: domainTestData,
        });
      }
    }

    if (this.testSuiteData?.contextTests) {
      for (const contextTestData of this.testSuiteData.contextTests) {
        const filepath = `${contextTestData.package.replaceAll('.', '/')}/${contextTestData.contextName}ContextTests.java`;

        this.fs.copyTpl(this.templatePath('context-test.java.tpl'), this.destinationPath(filepath), {
          contextTest: contextTestData,
        });
      }
    }

    if (this.testSuiteData?.entityTests) {
      for (const entityTestData of this.testSuiteData.entityTests) {
        const filepath = `${entityTestData.package.replaceAll('.', '/')}/${entityTestData.entityName}EntityTests.java`;

        this.fs.copyTpl(this.templatePath('entity-test.java.tpl'), this.destinationPath(filepath), {
          entityTest: entityTestData,
        });
      }
    }

    if (this.testSuiteData?.enumTests) {
      for (const enumTestData of this.testSuiteData.enumTests) {
        const filepath = `${enumTestData.package.replaceAll('.', '/')}/${enumTestData.enumName}EnumTests.java`;

        this.fs.copyTpl(this.templatePath('enum-test.java.tpl'), this.destinationPath(filepath), {
          enumTest: enumTestData,
        });
      }
    }

    if (this.testSuiteData?.valueObjectTests) {
      for (const valueObjectTestData of this.testSuiteData.valueObjectTests) {
        const filepath = `${valueObjectTestData.package.replaceAll('.', '/')}/${valueObjectTestData.valueObjectName}ValueObjectTests.java`;

        this.fs.copyTpl(this.templatePath('value-object-test.java.tpl'), this.destinationPath(filepath), {
          valueObjectTest: valueObjectTestData,
        });
      }
    }

    if (this.testSuiteData?.domainEventTests) {
      for (const domainEventTestData of this.testSuiteData.domainEventTests) {
        const filepath = `${domainEventTestData.package.replaceAll('.', '/')}/${domainEventTestData.domainEventName}DomainEventTests.java`;

        this.fs.copyTpl(this.templatePath('domainevent-test.java.tpl'), this.destinationPath(filepath), {
          domainEventTest: domainEventTestData,
        });
      }
    }

    if (this.testSuiteData?.domainServiceTests) {
      for (const domainServiceTestData of this.testSuiteData.domainServiceTests) {
        const filepath = `${domainServiceTestData.package.replaceAll('.', '/')}/${domainServiceTestData.domainServiceName}DomainServiceTests.java`;

        this.fs.copyTpl(this.templatePath('domainservice-test.java.tpl'), this.destinationPath(filepath), {
          domainServiceTest: domainServiceTestData,
        });
      }
    }
  }

  // install() {
  //   // this.installDependencies();
  // }
}
