import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputSearchBox from "../InputSearchBox";
import axios from "axios";
import Spinner from "../Spinner";
import { SpinnerType } from "../../utils/constants";

const data = [
  {
    data: {
      "com.shopizer|shopizer": "3.2.3",
      "org.springframework.boot|spring-boot-starter-parent": "2.5.12",
      "com.shopizer|sm-core": "3.2.3",
      "com.shopizer|sm-core-model": "3.2.3",
      "com.shopizer|sm-core-modules": "3.2.3",
      "com.shopizer|sm-shop-model": "3.2.3",
      "javax.inject|javax.inject": "1",
      "org.apache.commons|commons-lang3": "3.5",
      "org.mapstruct|mapstruct": "1.3.0.Final",
      "io.jsonwebtoken|jjwt": "0.8.0",
      "com.fasterxml.jackson.core|jackson-databind": "2.12.6.1",
      "com.fasterxml.jackson.core|jackson-core": "2.10.2",
      "com.fasterxml.jackson.core|jackson-annotations": "2.10.2",
      "javax.mail|mail": "1.4.7",
      "com.googlecode.json-simple|json-simple": "1.1.1",
      "mysql|mysql-connector-java": "8.0.21",
      "com.google.maps|google-maps-services": "0.1.6",
      "org.kie|kie-ci": "7.32.0.Final",
      "org.drools|drools-decisiontables": "7.32.0.Final",
      "org.drools|drools-core": "7.32.0.Final",
      "org.drools|drools-compiler": "7.32.0.Final",
      "org.kie|kie-spring": "7.32.0.Final",
      "org.infinispan|infinispan-core": "9.4.18.Final",
      "org.infinispan|infinispan-cachestore-jdbc": "9.4.18.Final",
      "org.infinispan|infinispan-tree": "9.4.18.Final",
      "org.apache.commons|commons-collections4": "4.1",
      "commons-validator|commons-validator": "1.5.1",
      "com.amazonaws|aws-java-sdk-s3": "1.11.640",
      "com.amazonaws|aws-java-sdk-ses": "1.11.640",
      "com.google.cloud|google-cloud-storage": "1.74.0",
      "com.paypal.sdk|merchantsdk": "2.6.109",
      "com.stripe|stripe-java": "19.5.0",
      "com.braintreepayments.gateway|braintree-java": "2.73.0",
      "com.maxmind.geoip2|geoip2": "2.7.0",
      "com.google.guava|guava": "27.1-jre",
      "commons-io|commons-io": "2.7",
      "commons-fileupload|commons-fileupload": "1.3.3",
      "io.springfox|springfox-swagger2": "2.9.2",
      "io.springfox|springfox-swagger-ui": "2.9.2",
      "javax.annotation|javax.annotation-api": "1.3.2",
      "com.github.spotbugs|spotbugs-maven-plugin": "3.1.8",
      "org.sonatype.plugins|nexus-staging-maven-plugin": "1.6.7",
      "org.apache.maven.plugins|maven-release-plugin": "2.5.3",
      "org.json|json": "20211205",
      "com.shopizer|shipping-canadapost-spring-boot-starter": "2.17.0",
      "com.shopizer|shopizer-commons": "1.0.6",
      "com.shopizer|shopizer-search-opensearch-spring-boot-starter": "1.0.3",
      "commons-collections|commons-collections": "3.2.2",
      "org.apache.commons|commons-rng-simple": "1.3",
      "org.owasp.antisamy|antisamy": "1.6.7",
      "org.passay|passay": "1.6.0",
    },
  },
];

export default function DependencyList() {
  console.log(
    "Render count in src/components/DependencyList/index.tsx: ",
    window.renderCount++,
  );
  const [dependencies, setDependencies] = useState({});
  const [inputSearch, setInputSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const { state } = useLocation();
  const { repo } = state;
  console.log(state);
  console.log(repo);

  const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const filteredDependencies = Object.entries(dependencies).filter(
    ([dependencyKey, version]) =>
      dependencyKey.toLowerCase().includes(inputSearch.toLowerCase()) ||
      (version as string).includes(inputSearch),
  );

  useEffect(() => {
    async function getDependencies() {
      console.log("getDependencies called");
      const response = await axios.get(
        "http://localhost:3001/api/dependencies",
        {
          params: { reponame: repo.name, username: repo.owner.login },
          withCredentials: true,
        },
      );
      const data = response.data;
      console.log(data);
      setDependencies(data.data);
      setLoading(false);
    }

    getDependencies();
  }, []);

  // ToDO: Add error handling cases for no-internet

  return loading ? (
    <Spinner type={SpinnerType.PROGRESS} />
  ) : (
    <div className="flex flex-col">
      <InputSearchBox
        handleInputSearchChange={handleInputSearchChange}
        placeholder="Search by Group, Artifact or Version"
      />
      <div className="m-4 overflow-x-auto">
        <div className="inline-block min-w-full p-1.5 align-middle">
          <div className="overflow-hidden rounded-lg border shadow dark:border-gray-700 dark:shadow-gray-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500 dark:text-gray-200"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500 dark:text-gray-200"
                  >
                    Group
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500 dark:text-gray-200"
                  >
                    Artifact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500 dark:text-gray-200"
                  >
                    Version
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredDependencies
                  .sort()
                  .map(([dependencyKey, version], idx) => {
                    const [groupId, artifactId] = dependencyKey.split("|");
                    return (
                      <tr key={dependencyKey} className="hover:bg-neutral-100">
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-800">
                          {idx + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-800">
                          {groupId ? groupId : ""}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-800">
                          {artifactId ? artifactId : ""}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-800">
                          {typeof version === "string" ? version : ""}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
