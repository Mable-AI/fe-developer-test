### Improvements for the build process:

#### Is there a better way to do this? Can we use any other bundlers? (Answer expected)

1. We are currently using tsup to build the library. It's great, and I don't find any reason to change it.
2. Rollup is another popular bundler, but tsup is faster and good for internal build.
3. The only drawback is using shell script to generate the index.ts file. It is platform dependent (may not work on Windows) and slower due to file system operations.
4. For possible improvements, I'm not aware of other ways to generate the index.ts file.

#### Why would you choose one approach over the other? (Answer expected)

1. N/A

#### Refactor the export mechanism of the repository to use your strategy

1. N/A
