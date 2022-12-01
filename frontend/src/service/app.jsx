export const convertImage = (urlImage) => {
    const check = urlImage.includes('/');
    if (check) {
        return urlImage;
    }else {
        return `https://docs.google.com/uc?export=download&id=${urlImage}`;
    }
}