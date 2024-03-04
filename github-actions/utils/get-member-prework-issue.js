// Find the Prework issue assigned to the issue author
async function getMemberPreworkIssue(github, context, memberGithubHandle) {

  const preworkIssue = await github.rest.issues.listForRepo({
    owner: context.repo.owner,
    repo: context.repo.repo,
    creator: memberGithubHandle,
    labels: 'Complexity: Prework',
  });

  // Return the first issue with the label "Complexity: Prework" assigned to the issue author. Should only be one.
  return preworkIssue.data[0]

}

module.exports = getMemberPreworkIssue