package <%= enumTest.package %>;

import org.springframework.boot.test.context.SpringBootTest;

import com.tngtech.archunit.core.domain.JavaClass;
import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.lang.ArchRule;
import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.classes;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

@SpringBootTest
class <%= enumTest.enumName %>ValueObjectTests {

        private static final String BASE_PACKAGE = "<%= enumTest.basePackage %>";
        private static final String DOMAIN_LAYER_PACKAGE_NAME = "<%= enumTest.domainLayerName %>";

        private static final String DOMAIN_NAME = "<%= enumTest.domainName %>";
        private static final String CONTEXT_NAME = "<%= enumTest.contextName %>";
        <% if (enumTest.isPartOfAggregate) { %>
        private static final String AGGREGATE_NAME = "<%= enumTest.aggregateName %>";
        <% } %>

        private static final String ENUM_NAME = "<%= enumTest.enumName %>";

        private static final String DOMAIN_PACKAGE_NAME = "<%= enumTest.domainPackageName %>";
        private static final String CONTEXT_PACKAGE_NAME = "<%= enumTest.contextPackageName %>";
        <% if (enumTest.isPartOfAggregate) { %>
        private static final String AGGREGATE_PACKAGE_NAME = "<%= enumTest.aggregatePackageName %>";
        <% } %>

        private static final String DOMAIN_PACKAGE = "<%= enumTest.domainPackage %>";
        private static final String CONTEXT_PACKAGE = "<%= enumTest.contextPackage %>";
        <% if (enumTest.isPartOfAggregate) { %>
        private static final String AGGREGATE_PACKAGE = "<%= enumTest.aggregatePackage %>";
        <% } %>

        /**
         * There should be a type representing the <%= enumTest.typeType %>
         * The type should have the same name as the defined <%= enumTest.typeType %>
         * The type should reside in the domain layer
         * The type should reside in a package/module representing the related bounded
         * context
         */

        @Test
        void moduleShouldContainClassWithEnumsName() {
                // Import all classes from the base package
                JavaClasses importedClasses = new ClassFileImporter().importPackages(CONTEXT_PACKAGE);

                // Check if any class has the given name
                boolean classExists = importedClasses.stream()
                                .anyMatch(javaClass -> javaClass.getSimpleName().equals(ENUM_NAME));

                // Assert that the class exists
                assertThat(classExists)
                                .as("Check if a class named '%s' exists", ENUM_NAME)
                                .isTrue();
        }

        @Test
        void enumShouldResideInDomainLayer() {
                JavaClasses importedClasses = new ClassFileImporter().importPackages(CONTEXT_PACKAGE);

                JavaClass clazz = importedClasses.stream()
                                .filter(javaClass -> javaClass.getSimpleName().equals(ENUM_NAME)).findFirst().get();

                ArchRule rule = classes().that().haveFullyQualifiedName(clazz.getFullName()).should()
                                .resideInAPackage(".." + DOMAIN_LAYER_PACKAGE_NAME + "..");

                rule.check(importedClasses);
        }

        @Test
        void enumShouldResideInBoundedContext() {
                JavaClasses importedClasses = new ClassFileImporter().importPackages(CONTEXT_PACKAGE);

                JavaClass clazz = importedClasses.stream()
                                .filter(javaClass -> javaClass.getSimpleName().equals(ENUM_NAME)).findFirst().get();

                ArchRule rule = classes().that().haveFullyQualifiedName(clazz.getFullName()).should()
                                .resideInAPackage(CONTEXT_PACKAGE + "..");

                rule.check(importedClasses);
        }

        <% if (enumTest.isPartOfAggregate) { %>
        @Test
        void enumShouldResideInAggregate() {
                JavaClasses importedClasses = new ClassFileImporter().importPackages(CONTEXT_PACKAGE);

                JavaClass clazz = importedClasses.stream()
                                .filter(javaClass -> javaClass.getSimpleName().equals(ENUM_NAME)).findFirst().get();

                ArchRule rule = classes().that().haveFullyQualifiedName(clazz.getFullName()).should()
                                .resideInAPackage(AGGREGATE_PACKAGE + "..");

                rule.check(importedClasses);
        }
        <% } %>
}
