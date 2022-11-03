import './App.scss';
import Header from "./component/Header";
import TableUser from "./component/TableUser";
import Container from "react-bootstrap/Container";

function App() {
    return (
        <div className='app-container'>
            <Header></Header>
            <Container>
                <TableUser></TableUser>
            </Container>
        </div>
    );
}

export default App;
