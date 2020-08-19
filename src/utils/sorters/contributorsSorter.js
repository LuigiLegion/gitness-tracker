// Initializations
const contributorsSorter = contributors => {
  contributors.sort((contributorOne, contributorTwo) => {
    if (
      contributorOne.node.contributionsCollection.totalCommitContributions >
      contributorTwo.node.contributionsCollection.totalCommitContributions
    ) {
      return -1;
    } else if (
      contributorOne.node.contributionsCollection.totalCommitContributions <
      contributorTwo.node.contributionsCollection.totalCommitContributions
    ) {
      return 1;
    } else {
      return 0;
    }
  });
};

// Exports
export default contributorsSorter;
