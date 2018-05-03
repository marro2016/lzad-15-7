
class Stopwatch extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			running: false,
			watch: 0,
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		}
	};

	start() {
		if (!this.state.running) {
			this.setState ({
				running: true,
				watch: setInterval(() => this.step(), 10)
			});
		}	
	};

	step() {
		if (!this.state.running) return;
		this.calculate();

	};

	calculate() {
		let{
			minutes,
			seconds,
			miliseconds
		} = this.state;
		miliseconds +=1;
		if (miliseconds >= 100) {
			seconds += 1;
			miliseconds = 0;
		}
		if (seconds >= 60) {
			minutes += 1;
			seconds = 0;
		}
		this.setState ({
			minutes: minutes,
			seconds: seconds,
			miliseconds: miliseconds
		});
	};

	stop() {
		this.setState({running: false});
		clearInterval(this.state.watch);
	};

	reset() {
		this.setState({
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		});
	};

	format(times) {
		return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
	};

	render() {
		return (
			<div>
				<div className={'stopwatch'}>{this.format()}</div>
				<button className='start' onClick={()=>this.start() }>Start</button>
				<button className='stop' onClick={()=>this.stop()}>Stop</button>
				<button className='reset' onClick={ ()=>this.reset() }>Reset</button>
			</div>
		);
	};
};

const stopwatch = new Stopwatch(
	document.querySelector('.stopwatch'));

function pad0(value) {
	let result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
};

const app = document.getElementById('app');
ReactDOM.render(<Stopwatch/>, app);
