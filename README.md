# DDD Domain Model Test Generator

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.13845062.svg)](https://doi.org/10.5281/zenodo.13845062)

This project is part of my master thesis "Bridging the Gap Between Specification and Implementation in DDD" at TH Köln University of Applied Sciences.

The **DDD Domain Model Test Generator** is a Yeoman ([https://yeoman.io](https://yeoman.io/)) code generator capable of generating domain model tests for Java Spring Applications.

Domain model tests introduced in the thesis are tests validating the model-code gap based on a properly defined domain model. In my work a DDD metamodel were defined to describe a domain model with patterns from Domain-Driven Design (DDD).

## Installation

To use the **DDD Domain Model Test Generator** you need to install the yeoman cli and the generator first via npm:

```sh
npm install -g yo
npm install -g git+https://github.com/yw-masterthesis/ddd-generator.git
```

## Usage

To use the **DDD Domain Model Test Generator** you need to define your domain model with the DDD Metamodel described in the thesis and save it as XML file. You can find an [example.domain-model.xml](./docs/example.domain-model.xml) file and a [domain-model.dtd](./docs/domain-model.dtd) file for validation in the docs directory.

Furthermore you require a [generator-config.json](./docs/example.generator-config.json) to provide the code generator with additional information about your project structure.

Now you can run in the root of your Java Spring Boot Application:

```
yo ddd
```

to start the code generator. The generator will prompt you about the required files and an output directory and then generates the tests.

An example of a generated test looks like this:

```Java
package com.example.library.catalogue.model.books;

...

@SpringBootTest
class BookValueObjectTests {

        private static final String DOMAIN_LAYER_PACKAGE_NAME = "model";
        private static final String ENTITY_NAME = "Book";
        private static final String CONTEXT_PACKAGE = "com.example.library.catalogue.model";
        private static final String AGGREGATE_PACKAGE = "com.example.library.catalogue.model.books";

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
...
```
