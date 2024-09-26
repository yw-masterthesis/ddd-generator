package <%= contextTest.package %>;

import org.springframework.boot.test.context.SpringBootTest;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.lang.ArchRule;
import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.classes;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

@SpringBootTest
public class <%= contextTest.contextName %>ContextTests {

        private static final String BASE_PACKAGE = "<%= contextTest.basePackage %>";
        private static final String DOMAIN_LAYER_PACKAGE_NAME = "<%= contextTest.domainLayerName %>";

        private static final String DOMAIN_NAME = "<%= contextTest.domainName %>";
        private static final String CONTEXT_NAME = "<%= contextTest.contextName %>";

        private static final String DOMAIN_PACKAGE_NAME = "<%= contextTest.domainPackageName %>";
        private static final String CONTEXT_PACKAGE_NAME = "<%= contextTest.contextPackageName %>";

        private static final String DOMAIN_PACKAGE = "<%= contextTest.domainPackage %>";
        private static final String CONTEXT_PACKAGE = "<%= contextTest.contextPackage %>";

        /**
         * There should be a package/module representing the bounded context
         * The package/module should have the same name as the bounded context
         * The package should only have dependencies to Upstream Contexts, OHS, SK
         * The package should have a dependency to defined upstream contexts
         */

        @Test
        void contextPackageExists() {
                // Import all classes from the context package
                JavaClasses importedClasses = new ClassFileImporter().importPackages(CONTEXT_PACKAGE);

                // Assert loaded classes are greater than 0
                assertThat(importedClasses.size()).as("Check if classes exist in context package '%s'", CONTEXT_PACKAGE)
                                .isNotEqualTo(0);
        }

        @Test
        void contextPackageResideInDomainPackage() {
                // Import all classes from the context package
                JavaClasses importedClasses = new ClassFileImporter().importPackages(DOMAIN_PACKAGE);

                ArchRule rule = classes().that().resideInAPackage(CONTEXT_PACKAGE + "..")
                                .should().resideInAPackage(DOMAIN_PACKAGE + "..");

                // Assert that the class exists
                rule.check(importedClasses);
        }

        // @Test
        // void contextPackageExists() {
        // // Import all classes from the context package
        // JavaClasses importedClasses = new
        // ClassFileImporter().importPackages(DOMAIN_PACKAGE);

        // ArchRule rule =
        // classes().that().resideInAPackage(BOUNDED_CONTEXT_LAYER).and().resideInAPackage(DOMAIN_LAYER)
        // .should().onlyDependOnClassesThat().resideInAnyPackage(WHITELIST_PACKAGES);

        // // Assert that the class exists
        // rule.check(importedClasses);
        // }
}
