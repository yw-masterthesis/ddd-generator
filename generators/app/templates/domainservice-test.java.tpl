package <%= domainServiceTest.package %>;

import org.springframework.boot.test.context.SpringBootTest;

import com.tngtech.archunit.core.domain.JavaClass;
import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.lang.ArchRule;
import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.classes;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

@SpringBootTest
class <%= domainServiceTest.domainServiceName %>DomainServiceTests {

        private static final String BASE_PACKAGE = "<%= domainServiceTest.basePackage %>";
        private static final String DOMAIN_LAYER_PACKAGE_NAME = "<%= domainServiceTest.domainLayerName %>";

        private static final String DOMAIN_NAME = "<%= domainServiceTest.domainName %>";
        private static final String CONTEXT_NAME = "<%= domainServiceTest.contextName %>";

        private static final String VALUE_OBJECT_NAME = "<%= domainServiceTest.domainServiceName %>";

        private static final String DOMAIN_PACKAGE_NAME = "<%= domainServiceTest.domainPackageName %>";
        private static final String CONTEXT_PACKAGE_NAME = "<%= domainServiceTest.contextPackageName %>";

        private static final String DOMAIN_PACKAGE = "<%= domainServiceTest.domainPackage %>";
        private static final String CONTEXT_PACKAGE = "<%= domainServiceTest.contextPackage %>";

        /**
         * There should be a type representing the <%= domainServiceTest.typeType %>
         * The type should have the same name as the defined <%= domainServiceTest.typeType %>
         * The type should reside in the domain layer
         * The type should reside in a package/module representing the related bounded
         * context
         */

        @Test
        void moduleShouldContainClassWithDomainServicesName() {
                // Import all classes from the base package
                JavaClasses importedClasses = new ClassFileImporter().importPackages(CONTEXT_PACKAGE);

                // Check if any class has the given name
                boolean classExists = importedClasses.stream()
                                .anyMatch(javaClass -> javaClass.getSimpleName().equals(VALUE_OBJECT_NAME));

                // Assert that the class exists
                assertThat(classExists)
                                .as("Check if a class named '%s' exists", VALUE_OBJECT_NAME)
                                .isTrue();
        }

        @Test
        void domainServiceShouldResideInDomainLayer() {
                JavaClasses importedClasses = new ClassFileImporter().importPackages(CONTEXT_PACKAGE);

                JavaClass clazz = importedClasses.stream()
                                .filter(javaClass -> javaClass.getSimpleName().equals(VALUE_OBJECT_NAME)).findFirst().get();

                ArchRule rule = classes().that().haveFullyQualifiedName(clazz.getFullName()).should()
                                .resideInAPackage(".." + DOMAIN_LAYER_PACKAGE_NAME + "..");

                rule.check(importedClasses);
        }

        @Test
        void domainServiceShouldResideInBoundedContext() {
                JavaClasses importedClasses = new ClassFileImporter().importPackages(CONTEXT_PACKAGE);

                JavaClass clazz = importedClasses.stream()
                                .filter(javaClass -> javaClass.getSimpleName().equals(VALUE_OBJECT_NAME)).findFirst().get();

                ArchRule rule = classes().that().haveFullyQualifiedName(clazz.getFullName()).should()
                                .resideInAPackage(CONTEXT_PACKAGE + "..");

                rule.check(importedClasses);
        }
}
