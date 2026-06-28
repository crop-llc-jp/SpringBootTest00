import { React } from "../react.js";

// ログイン成功後の画面を表示します
function LoginResultView(props) {
    const userName = props.currentUser ? props.currentUser.userName : "";

    return (
        <React.Fragment>
            <h1>検索結果</h1>
            <p className="success">{userName}さんがログインしました</p>
            <div className="actions">
                <button type="button" onClick={props.onList} disabled={props.loading}>
                    一覧へ
                </button>
                <button
                    type="button"
                    className="secondary"
                    onClick={props.onLogout}
                    disabled={props.loading}
                >
                    ログアウト
                </button>
            </div>
        </React.Fragment>
    );
}

// 他のファイルから import できるように画面部品を公開します
export {
    LoginResultView
};
