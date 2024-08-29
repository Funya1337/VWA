const users = [
    {
        id: 1,
        username: "admin",
        password: "admin",
        age: 28
    },
    {
        id: 2,
        username: "bob",
        password: "pass",
        age: 32
    },
    {
        id: 3,
        username: "asdf",
        password: "asdf",
        age: 24
    },
    {
        id: 4,
        username: "bob_brown",
        password: "bobPass000",
        age: 45
    }
];

const posts = [
    {
        id: 1,
        username: "admin",
        body: "this is my test blog"
    },
    {
        id: 2,
        username: "asdf",
        body: "this is my test blog 1"
    },
    {
        id: 3,
        username: "fff",
        body: "this is my test blog 2"
    },
];

const getUser = async (username) => {
    return users.find(user => user.username === username);
};

const getPosts = async () => {
    return posts.filter((post) => post);
};

const getPostById = async (id) => {
    return posts.filter((post) => post.id == id)
}

const deletePost = async (id) => {
    const postIndex = posts.findIndex(post => post.id === Number(id));
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        return true;
    }

    return false;
};

const editPost = async (body, id) => {
    const postIndex = posts.findIndex(post => post.id === Number(id));
    
    if (postIndex !== -1) {
        posts[postIndex].body = body;
        return posts[postIndex];
    }

    return null;
};

const addPost = async (username, body) => {
    const newId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;

    const newPost = {
        id: newId,
        username: username,
        body: body
    };
    posts.push(newPost);

    return newPost;
};

const printPosts = () => {
    console.log(posts);
}

module.exports = { getUser, getPosts, addPost, printPosts, getPostById, deletePost, editPost };