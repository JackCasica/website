// Add a comment to the prework issue describing the event/activity
async function postCommentOnPreworkIssue(comment, github, context) {
    try {
        // Get the prework issue assigned to the issue author
        const [preworkIssue] = await github.rest.issues.listForRepo({
            owner: context.repo.owner,
            repo: context.repo.repo,
            creator: context.payload.issue.user.login,
            labels: 'Complexity: Prework',
        });

        // Add a comment to the prework issue describing the event/activity
        const commentResponse = await github.rest.issues.createComment({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: preworkIssue.number,
            body: comment,
        });

        return commentResponse;
    } catch (err) {
        throw new Error(err);
    }

}

module.exports = postCommentOnPreworkIssue;