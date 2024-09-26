package <%= entityTest.package %>;

import org.springframework.boot.test.context.SpringBootTest;

import com.tngtech.archunit.core.domain.JavaClass;
import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.lang.ArchRule;
import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.classes;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

@SpringBootTest
class <%= entityTest.entityName %>EntityTests {

        private static final String BASE_PACKAGE = "<%= entityTest.basePackage %>";
        private static final String DOMAIN_LAYER_PACKAGE_NAME = "<%= entityTest.domainLayerName %>";

        private static final String DOMAIN_NAME = "<%= entityTest.domainName %>";
        private static final String CONTEXT_NAME = "<%= entityTest.contextName %>";
        private static final String AGGREGATE_NAME = "<%= entityTest.aggregateName %>";
        private static final String ENTITY_NAME = "<%= entityTest.entityName %>";

        private static final String DOMAIN_PACKAGE_NAME = "<%= entityTest.domainPackageName %>";
        private static final String CONTEXT_PACKAGE_NAME = "<%= entityTest.contextPackageName %>";
        private static final String AGGREGATE_PACKAGE_NAME = "<%= entityTest.aggregatePackageName %>";

        private static final String DOMAIN_PACKAGE = "<%= entityTest.domainPackage %>";
        private static final String CONTEXT_PACKAGE = "<%= entityTest.contextPackage %>";
        private static final String AGGREGATE_PACKAGE = "<%= entityTest.aggregatePackage %>";

        /**
         * There should be a type representing the <%= entityTest.typeType %>
         * The type should have the same name as the defined <%= entityTest.typeType %>
         * The type should reside in the domain layer
         * The type should reside in a package/module representing the related bounded
         * context
         */

        @Test
        void moduleShouldContainClassWithEntitiesName() {
                // Import all classes from the base package
                JavaClasses importedClasses = new ClassFileImporter().importPackages(CONTEXT_PACKAGE);

                // Check if any class has the given name
                boolean classExists = importedClasses.stream()
                                .anyMatch(javaClass -> javaClass.getSimpleName().equals(ENTITY_NAME));

                // Assert that the class exists
                assertThat(classExists)
                                .as("Check if a class named '%s' exists", ENTITY_NAME)
                                .isTrue();
        }

        @Test
        void entityShouldResideInDomainLayer() {
                JavaClasses importedClasses = new ClassFileImporter().importPackages(CONTEXT_PACKAGE);

                JavaClass clazz = importedClasses.stream()
                                .filter(javaClass -> javaClass.getSimpleName().equals(ENTITY_NAME)).findFirst().get();

                ArchRule rule = classes().that().haveFullyQualifiedName(clazz.getFullName()).should()
                                .resideInAPackage(".." + DOMAIN_LAYER_PACKAGE_NAME + "..");

                rule.check(importedClasses);
        }

        @Test
        void entityShouldResideInBoundedContext() {
                JavaClasses importedClasses = new ClassFileImporter().importPackages(CONTEXT_PACKAGE);

                JavaClass clazz = importedClasses.stream()
                                .filter(javaClass -> javaClass.getSimpleName().equals(ENTITY_NAME)).findFirst().get();

                ArchRule rule = classes().that().haveFullyQualifiedName(clazz.getFullName()).should()
                                .resideInAPackage(CONTEXT_PACKAGE + "..");

                rule.check(importedClasses);
        }
}
