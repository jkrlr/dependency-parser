export const extractDependencies = (parsedJson) => {
    const propertiesMap = populatePropertiesMap(parsedJson); // Because properties can be in any directory of the project (i.e. we don't know the exact location of the parent-file/properties file)
    const dependenciesMap = {};
  
    // Iterate through each project in the parsed JSON
    for (const pomFileContent of parsedJson) {
        // Edge Case: Check if the project is valid
        if (!pomFileContent || !pomFileContent.project) {
            console.log('Invalid project');
            continue;
        }

        const project = pomFileContent.project;
        
        // Extract Top level -> groupId, artifactId, and version
        if (project.groupId && project.artifactId && project.version) {
          const key = `${project.groupId}|${project.artifactId}`;
          dependenciesMap[ key ] = project.version;
        }
        
        // Extract parent dependencies
        if (project.parent && project.parent.version) {
            const parent = project.parent;
            const parentKey = `${parent.groupId}|${parent.artifactId}`;
            dependenciesMap[ parentKey ] = parent.version;
        }
        
        // Extract DependencyManagement dependencies
        if (project.dependencyManagement && project.dependencyManagement.dependencies) {
            console.log('Dependency Management');
            let dependencies = project.dependencyManagement.dependencies.dependency;
            pouplateDependenciesMap(dependencies, dependenciesMap, propertiesMap);
        }

        // Extract dependencies
        if (project.dependencies) {
            console.log('Dependencies');
            let dependencies = project.dependencies.dependency;
            pouplateDependenciesMap(dependencies, dependenciesMap, propertiesMap);
        }

        // Extract pluginManagement dependencies
        if (project.build && project.build.pluginManagement && project.build.pluginManagement.plugins) {
            console.log('Plugin Management');
            let plugins = project.build.pluginManagement.plugins.plugin;
            pouplateDependenciesMap(plugins, dependenciesMap, propertiesMap);
        }


        // Extract plugin dependencies
        if (project.build && project.build.plugins) {
            console.log('Plugins');
            let plugins = project.build.plugins.plugin;
            pouplateDependenciesMap(plugins, dependenciesMap, propertiesMap);
        }
    }

    console.log('Returning dependenciesMap......................................................................');
    return dependenciesMap;
}

const populatePropertiesMap = (parsedJson) => {
  const propertiesMap = {};
  for (const pomFileContent of parsedJson) {
      if (!pomFileContent || !pomFileContent.project) {
          console.log('Invalid project');
          continue;
      }

      const project = pomFileContent.project;

      // Extract properties and add them to the properties map
      if (project.properties) {
          const properties = project.properties;
          Object.keys(properties).forEach(key => {
              if (key !== 'project.build.sourceEncoding' && key !== 'project.reporting.outputEncoding') {
                  console.log("key: ", key);
                  console.log("properties[ key ]: ", properties[ key ]);
                  if (properties[ key ].startsWith('${') && properties[ key ].endsWith('}')) {
                      /*
                      key:  runtime.dir
                      properties[ key ]:  ${project.artifactId}-${project.version}
                      */
                      const originalKey = properties[ key ].substring(2, properties[ key ].length - 1);
                      if (originalKey in propertiesMap) {
                          propertiesMap[ key ] = properties[ originalKey ];
                      }
                  }
                  else {
                      propertiesMap[ key ] = properties[ key ];
                  }
              }
          });
      }
  }

  return propertiesMap;
}

const pouplateDependenciesMap = (dependencies, dependenciesMap, propertiesMap) => {
  dependencies = Array.isArray(dependencies) ? dependencies : [ dependencies ]; // https://stackoverflow.com/questions/1961528/how-to-create-an-array-if-an-array-does-not-exist-yet
  
  for (const dependency of dependencies) {
    // Edge Cases
    if (!dependency.groupId || !dependency.artifactId) {
      // Sometimes, groupId is not present. But artifactId is present.
      // Example:
      // <dependency>
      //   <artifactId>spring-boot-starter-test</artifactId>
      //   <scope>test</scope>
      // </dependency>
      // https://stackoverflow.com/questions/29476472/maven-dependency-without-version
      continue;
    }

    const dependencyKey = `${dependency.groupId}|${dependency.artifactId}`;
    if (!dependency.version) {
      // TODO: Handle this case
      // 1. From Parent Pom file i.e. from dependencyManagement

      // 2. From Spring BOM
      // https://stackoverflow.com/questions/29476472/maven-dependency-without-version          
    }
    else if (dependency.version.startsWith('${') && dependency.version.endsWith('}')) {
      const originalKey = dependency.version.substring(2, dependency.version.length - 1);

      if (originalKey in propertiesMap) {
        dependenciesMap[ dependencyKey ] = propertiesMap[ originalKey ];
      }
    }
    else {
      dependenciesMap[ dependencyKey ] = dependency.version;
    }
  }
}

