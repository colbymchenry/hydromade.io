import styles from './styles.module.css'

export default function GithubConnect(props) {

    return (
        <div className={"d-flex flex-column " + styles.main}>
            <h3>To start on a theme connect your GitHub account.</h3>
            <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/app/marketplace&scope=user,repo`}>Login with GitHub</a>
        </div>
    )

}