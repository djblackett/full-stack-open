# Fullstack Open - Part 11
## Introduction to CI/CD
### Exercise 11.1

For this exercise, we are using the Java programming language. Our team has six people, and we are releasing our product
soon.

#### Linting
For a small team, using the same IDE with the same settings is probably good enough for basic code linting, but if we
wanted to take it to the next level and make sure we are strictly enforcing a certain code style, then we could use
SonarLint. I believe it would make sense to use Google’s Java style guide.

#### Testing
For testing, we will use a few different tools to cover the different kinds of tests we have for our application. We
will use JUnit for basic unit testing. Mockito will be our go-to for mocking classes and testing parts of our codebase
without worrying about all the dependencies. Our app’s REST services will be tested using REST Assured. This will
simplify our REST API integration testing.

#### Building
We will use Gradle as our build tool. Gradle is a very powerful tool, and it is possible to write very expressive
scripts using Kotlin. The major alternative is Maven, but our team prefers the more streamlined look of Gradle files
compared to Maven’s verbose XML nested angle brackets.

#### CI/CD
For a team of our size, I think it makes sense to use a cloud CI/CD solution. While a solution like Jenkins would
certainly get the job done, it wouldn’t be a good use of our scarce resources to devote the necessary time to
configuration and to purchase in-house servers to run it. A good choice would be CircleCI. It is a cloud service that
integrates with GitHub. It runs builds using containers or VMs, runs automated testing, and it can also deploy the
builds to our host service. 


