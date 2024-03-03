/**
 * Posts a comment on github
 * @param {Number} issueNum - the issue number where the comment should be posted
 * @param {String} comment - the comment to be posted
 */


async function postComment(issueNum, comment, github, context) {
    console.log(issueNum, "Issue number")
    try {
        const commentResponse = await github.rest.issues.createComment({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: issueNum,
            body: comment,
        });

        console.log(commentResponse, "Comment posted successfully")
    } catch (err) {
        console.log(err, "Error posting comment")
        throw new Error(err);
        
    }
}

module.exports = postComment;