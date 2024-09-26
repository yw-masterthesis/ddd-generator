package <%= valueObjectTest.package %>;

import org.springframework.boot.test.context.SpringBootTest;

import com.tngtech.archunit.core.domain.JavaClass;
import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.lang.ArchRule;
import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.classes;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

@SpringBootTest
class <%= valueObjectTest.valueObjectName %>ValueObjectTests {

        private static final String BASE_PACKAGE = "<%= valueObjectTest.basePackage %>";
        private static final String DOMAIN_LAYER_PACKAGE_NAME = "<%= valueObjectTest.domainLayerName %>";

        private static final String DOMAIN_NAME = "<%= valueObjectTest.domainName %>";
        private static final String CONTEXT_NAME = "<%= valueObjectTest.contextName %>";
        <% if (valueObjectTest.isPartOfAggregate) { %>
        private static final String AGGREGATE_NAME = "<%= valueObjectTest.aggregateName %>";
        <% } %>

        private static final String VALUE_OBJECT_NAME = "<%= valueObjectTest.valueObjectName %>";

        private static final String DOMAIN_PACKAGE_NAME = "<%= valueObjectTest.domainPackageName %>";
        private static final String CONTEXT_PACKAGE_NAME = "<%= valueObjectTest.contextPackageName %>";
        <% if (valueObjectTest.isPartOfAggregate) { %>
        private static final String AGGREGATE_PACKAGE_NAME = "<%= valueObjectTest.aggregatePackageName %>";
        <% } %>

        private static final String DOMAIN_PACKAGE = "<%= valueObjectTest.domainPackage %>";
        private static final String CONTEXT_PACKAGE = "<%= valueObjectTest.contextPackage %>";
        <% if (valueObjectTest.isPartOfAggregate) { %>
        private static final String AGGREGATE_PACKAGE = "<%= valueObjectTest.aggregatePackage %>";
        <% } %>

        /**
         * There should be a type representing the <%= valueObjectTest.typeType %>
         * The type should have the same name as the defined <%= valueObjectTest.typeType %>
         * The type should reside in the domain layer
         * The type should reside in a package/module representing the related bounded
         * context
         */

        @Test
        void moduleShouldContainClassWithValueObjectsName() {
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
        void valueObjectShouldResideInDomainLayer() {
                JavaClasses importedClasses = new ClassFileImporter().importPackages(CONTEXT_PACKAGE);

                JavaClass clazz = importedClasses.stream()
                                .filter(javaClass -> javaClass.getSimpleName().equals(VALUE_OBJECT_NAME)).findFirst().get();

                ArchRule rule = classes().that().haveFullyQualifiedName(clazz.getFullName()).should()
                                .resideInAPackage(".." + DOMAIN_LAYER_PACKAGE_NAME + "..");

                rule.check(importedClasses);
        }

        @Test
        void valueObjectShouldResideInBoundedContext() {
                JavaClasses importedClasses = new ClassFileImporter().importPackages(CONTEXT_PACKAGE);

                JavaClass clazz = importedClasses.stream()
                                .filter(javaClass -> javaClass.getSimpleName().equals(VALUE_OBJECT_NAME)).findFirst().get();

                ArchRule rule = classes().that().haveFullyQualifiedName(clazz.getFullName()).should()
                                .resideInAPackage(CONTEXT_PACKAGE + "..");

                rule.check(importedClasses);
        }

        <% if (valueObjectTest.isPartOfAggregate) { %>
        @Test
        void valueObjectShouldResideInAggregate() {
                JavaClasses importedClasses = new ClassFileImporter().importPackages(CONTEXT_PACKAGE);

                JavaClass clazz = importedClasses.stream()
                                .filter(javaClass -> javaClass.getSimpleName().equals(VALUE_OBJECT_NAME)).findFirst().get();

                ArchRule rule = classes().that().haveFullyQualifiedName(clazz.getFullName()).should()
                                .resideInAPackage(AGGREGATE_PACKAGE + "..");

                rule.check(importedClasses);
        }
        <% } %>
}
