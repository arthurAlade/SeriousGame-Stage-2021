import React, {Component} from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useMutation,
    gql, HttpLink
} from "@apollo/client";
import InsertEquipe from './InsertEquipe'

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:3301/api',
    }),
    cache: new InMemoryCache()
});

const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#F0B27A',
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#63B7E1',
        },
    },
});
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const NEW_SEANCE = gql`
    mutation newSeance($date: DateTime, $lieu: String!, $naomark: Int!, $NumStoryboard: Int, $classeEcole: String){
        newSeance(date :$date, lieu: $lieu, naormark: $naomark, NumStoryboard: $NumStoryboard, classeEcole: $classeEcole){
            id
            date
            lieu
            naomark
            storyboard{id}
            etat
            classeEcole
        }
    }
`;
function NewSeance(date, lieu, naormark, NumStoryboard, classeEcole){
    console.log("Ajout seance");
    const [seance, { data }] = useMutation(NEW_SEANCE);
    seance({ variables: { date :date, lieu: lieu, naormark: naormark, NumStoryboard: NumStoryboard, classeEcole: classeEcole} });
    return data;
}

export default class NewSeanceComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            nomClasse: '',
            nomEcole: '',
            date: '2021-06-22T10:30',
            nbEquipes: 4,
            checked:  true,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
    }

    handleChange(event) {
        if (event.target.id === "classe-name"){
            this.setState({
                nomClasse: event.target.value
            })
        }
        else if (event.target.id === "ecole-name"){
            this.setState({nomEcole: event.target.value})
        }
        else if (event.target.id=== "switch"){
            this.setState({checked: event.target.checked})
        }
        else if (event.target.id === "datetime-local"){
            this.setState({date: event.target.value})
        }
        console.log(event)
    }
    handleChangeSelect(event){
        this.setState({nbEquipes: event.target.value})
    }
    handleSubmit(event) {
        //alert('Création de la séance en cours');
        //<InsertEquipe nbEquipes={this.state.nbEquipes}/>
        try{
            console.log("Essaaie");
            event.preventDefault();
            let classeEcole = this.state.nomClasse+this.state.nomEcole;
            /*<ApolloProvider client={client}>
                <NewSeance date={this.state.date} lieu={"Musée d'Angoulême"} naormark={112} NumStoryboard={1} classeEcole={classeEcole}/>
            </ApolloProvider>*/
            //NewSeance(this.state.date, "Musée d'Angoulême", 112, 1, classeEcole)
            //console.log("Bijour")
            return (
                console.log("On test"),
                <>
                    <ApolloProvider client={client}>
                        <NewSeance date={this.state.date} lieu={"Musée d'Angoulême"} naormark={112} NumStoryboard={1} classeEcole={classeEcole}/>
                    </ApolloProvider>,
                </>
            );
            //const [addTodo, { data }] = useMutation(NEW_SEANCE);
            //addTodo({ variables: { date :this.state.date, lieu: "Musée d'Angoulême", naormark: 112, NumStoryboard: 1, classeEcole: classeEcole} });
        }
        catch(e){
            alert("Création de la séance impossible !");
            console.log(e);
        }
    }
    
    render() {
        return (
            <ThemeProvider theme={theme}>
                <form className={useStyles.container} noValidate>
                    <TextField required onChange={this.handleChange}
                               id="datetime-local"
                               label="Date de la séance"
                               type="datetime-local"
                               value={this.state.date}
                               className={useStyles.textField}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                    />
                    <TextField required id="classe-name" label="Nom de la classe" value={this.state.nomClasse} onChange={this.handleChange}/>
                    <TextField required id="ecole-name" label="Nom de l'école" value={this.state.nomEcole} onChange={this.handleChange}/>
                    <FormControl className={useStyles.formControl}>
                        <InputLabel id="demo-simple-select-label">Nombre d'équipes</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={this.handleChangeSelect}
                            value={this.state.nbEquipes}
                        >
                            <MenuItem id="demo-simple-select" value={4}>4</MenuItem>
                            <MenuItem id="demo-simple-select" value={5}>5</MenuItem>
                            <MenuItem id="demo-simple-select" value={6}>6</MenuItem>
                        </Select>
                    </FormControl>
                    <Switch
                        id="switch"
                        checked={this.state.checked}
                        onChange={this.handleChange}
                        color="secondary"
                        name="checked"
                        inputProps={{'aria-label': 'primary checkbox'}}
                    />
                    <Fab color="primary" aria-label="add" variant="extended" onClick={this.handleSubmit}>
                        <AddIcon className={useStyles.extendedIcon}/>
                        Ajouter
                    </Fab>
                </form>
            </ThemeProvider>
        );
    }
}