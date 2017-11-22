import React from 'react'
import InputComponent from './InputComponent.jsx';
import ViewComponent from './ViewComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import CheckComponent from './CheckComponent.jsx'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			results: [],
			inputValue: null,
		}
	}

	getInputValue(e) {
		var itemInput = e.target.value;
		this.setState({ inputValue: itemInput });
	}


	add(value) {
		let results = this.state.results;
		if (results) {
			let maxId = 0;
			for (let i = 0; i < results.length; i++) {
				if (results[i].id > maxId) {
					maxId = results[i].id;
				}
			}
			maxId = maxId + 1;
			this.state.results.push({ value: value, id: maxId, isEnabled: false })
		}
		else {
			var id = 1;
			this.state.results.push({ value: value, id: id, isEnabled: false });
		}
		var objects = this.state.results;
		this.setState({ results: objects });
		localStorage.setItem("values", JSON.stringify(objects));
	}

	clearInput() {
		this.setState({ inputValue: "" })
	}

	remove(id) {
		let results = this.state.results;
		for (let i = 0; i < results.length; i++) {
			if (id === results[i].id) {
				results.splice(i, 1);
				this.setState({ results: results })
			}

		}

		this.setState({ results: results });
		localStorage.setItem("values", JSON.stringify(this.state.results));
	}

	changeInputTag(object) {
		document.getElementById(`divCover${object.id}`).innerHTML = `<input id="${object.id}" style="display: block; width: 506px; padding: 13px 17px 12px 17px; margin: 0 0 0 43px;" type="text"  onKeyDown={this.handleKeyDown} value="${object.value}"/>`;
	}

	updateCompleted(id) {
		let results = this.state.results;
		if (id !== undefined || id != null) {
			for (let i = 0; i < results.length; i++) {
				if (results[i].id === id) {
					results[i].isEnabled = !results[i].isEnabled;
					this.setState({ results: results })
				}
			}
		}
		let objects = this.state.results;
		localStorage.setItem("values", JSON.stringify(objects));
	}

	viewAll() {
		let results = JSON.parse(localStorage.getItem("values"));
		this.setState({ results: results })

	}

	viewActive() {
		let results = JSON.parse(localStorage.getItem("values"));
		let newObjects = [];
		for (let i = 0; i < results.length; i++) {
			if (results[i].isEnabled === false) {
				newObjects.push(results[i]);
			}
		}
		this.setState({ results: newObjects })
		
	}

	viewCompleted() {
		let results = JSON.parse(localStorage.getItem("values"));
		let newObjects = [];
		for (let i = 0; i < results.length; i++) {
			if (results[i].isEnabled === true) {
				newObjects.push(results[i]);
			}
		}
		this.setState({ results: newObjects })
	}

	clearCompleted() {
		let results = JSON.parse(localStorage.getItem("values"));
		let objects = [];
		if (results !== undefined || results !== null || results !== []) {
			for (let i = 0; i < results.length; i++) {
				if (results[i].isEnabled === false) {
					objects.push(results[i]);
				}
			}
		}
		this.setState({ results: objects })
		localStorage.setItem("values", JSON.stringify(objects));

	}

	checkAllCompleted() {
		let results = JSON.parse(localStorage.getItem("values"));
		let check = false;
		for (let i = 0; i < results.length; i++) {
			if (results[i].isEnabled === false) {
				check = true;
			}
		}
		if (check) {
			for (let i = 0; i < results.length; i++) {
				results[i].isEnabled = true;
			}
		} else {
			for (let i = 0; i < results.length; i++) {
				results[i].isEnabled = false;
			}
		}
		this.setState({ results: results });
		localStorage.setItem("values", JSON.stringify(results));
	}

	renderValue() {
		let results = this.state.results;
		let objects = results.map(obj => {
			return (
				<ViewComponent key={obj.id} object={obj} remove={e => this.remove(obj.id)} changeInputTag={e => this.changeInputTag(obj)} updateCompleted={e => this.updateCompleted(obj.id)} />
			)
		})
		return objects;
	}


	render() {

		let results = this.state.results;
		let length = results.length;
		if (length || length !== 0) {
			return (
				<div className="container">
					<div className="row ">
						<div className="col-2">
						</div>
						<div className="col-8">
							<section className="todoapp">
								<header className="header">
									<h1>todos</h1>
									<InputComponent onChange={e => this.getInputValue(e)} add={e => this.add(e)} />
								</header>
								<section className="main" >
									<CheckComponent checkAllCompleted={e => this.checkAllCompleted()} />
									<ul className="todo-list" id="viewList">
										{this.renderValue()}
									</ul>
								</section>
								<div id="divFooter">
									<FooterComponent length={length} viewAll={e => this.viewAll()} viewActive={e => this.viewActive()} viewCompleted={e => this.viewCompleted()} clearCompleted={e => this.clearCompleted()} />
								</div>
							</section>
						</div>

					</div>
				</div>
			)
		} else {
			return (
				<div className="container">
					<div className="row ">
						<div className="col-2">
						</div>
						<div className="col-8">
							<section className="todoapp">
								<header className="header">
									<h1>todos</h1>
									<InputComponent onChange={e => this.getInputValue(e)} add={e => this.add(e)} />
								</header>
							</section>
						</div>

					</div>
				</div>)
		}
	}
}

export default App;