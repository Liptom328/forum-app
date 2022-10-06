import posts from "../../../../services/posts";

export default async function GetPostById(req, res) {
    const postData = await posts.getDataById(req.query.id);

    if (postData !== undefined) {
        res.json({ message: "OK", id: postData['postid'], title: postData['title'], creator: postData['creator'], description: postData['description'], content: postData['content'] })
    } else {
        res.json({ message: "Post with that id doesnt exist" })
    }
}