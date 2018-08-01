class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            users: []
        };
    }
    
    onChangeHandle(event) {
        this.setState({searchText: event.target.value});
    }
    
    onSubmit(event) {
        event.preventDefault();
        const {searchText} = this.state;
        const url = `https://api.github.com/search/users?q=${searchText}`;
        fetch(url) 
            .then(response => response.json())
            .then(responseJson => this.setState({users: responseJson.items}));
    }
    
    render() {
        return (
            <div className={"container"}>
                <h1 className={"header"}>GITHUB SEARCH ENGINE</h1>
                <form onSubmit={event => this.onSubmit(event)}>
                    <label htmlFor="searchText" className={"label"}>Search by user name</label>
                    <input
                        type="text"
                        id="searchText"
                        onChange={event => this.onChangeHandle(event)}
                        value={this.state.searchText}
                        className={"input"}
                        placeholder="write something and press enter"
                    />
                </form>
                <UserList users={this.state.users}/>
            </div>
        );
    }
}

class UserList extends React.Component {
    
    get users() {
        return this.props.users.map(user => <User key={user.id} user={user}/> 
    );}
    
    render() {
        return (
            <div>
                {this.users}
            </div>
        );
    }
}

class User extends React.Component {
    
    render() {
        return (
            <div className={"image_container"}>
                <img src={this.props.user.avatar_url} className={"image"}/>
                <a href={this.props.user.html_url} target="_blank" className={"user_login"}>{this.props.user.login}</a>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root')); 
