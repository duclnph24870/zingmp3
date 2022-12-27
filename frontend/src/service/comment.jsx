const checkLikeComment = (likeds) => {
    const idUserSignIn = localStorage.getItem('idUser');
    if (!idUserSignIn) {
        return false;
    }

    return likeds.includes(idUserSignIn);
}

export {
    checkLikeComment,
}