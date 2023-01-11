import { db } from './firebase';

export const setComment = (e) => {
    e.preventDefault();

    const checkEmpty =
        e.target[0].value === "" ||
        e.target[2].value === "" ||
        e.target[3].value === "" ||
        e.target[3].value.length < 4;

    if (checkEmpty) {
        alert("빈 칸이 있거나, 자릿수가 맞는지 확인해주세요");
        return;
    }

    const id = Date.now();
    const commentObj = {
        id: id,
        comment: e.target[0].value,
        nickname: e.target[2].value,
        password: e.target[3].value,
        date: new Date().toLocaleDateString()
    }
    db.doc(`cyland/${id}`).set(commentObj);

    e.target[0].value = "";
    e.target[2].value = "";
    e.target[3].value = "";
}

export const checkUpdate = (id) => {
    document.getElementById(`${id}_delete`).classList.remove("display");
    document.getElementById(`${id}_update`).classList.toggle("display");
}

export const checkDelete = (id) => {
    document.getElementById(`${id}_update`).classList.remove("display");
    document.getElementById(`${id}_delete`).classList.toggle("display");
}

export const deleteComment = (e, password, id) => {
    e.preventDefault();

    const inputPwd = e.target[0].value;
    if (inputPwd === password) {
        const ok = window.confirm("메시지를 삭제할까요?");
        if (ok) db.doc(`cyland/${id}`).delete();
    } else {
        window.alert("비밀번호를 확인해주세요");
    }

    e.target[0].value = "";
}