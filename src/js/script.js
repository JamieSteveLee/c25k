var app = new Vue({
	el: '#app',
	data: {
		fullPlan,
		settingsOpen: false,
		editDates: false,
		settings: {
			showDates: true,
			showWarmupCooldown: true,
		}
	},
	computed: {
		computedDates() {
			if(!this.fullPlan || !this.fullPlan[0].date) return false;

			let datesArray = [];
			for (var i = 0; i < this.fullPlan.length; i++) {
				let newDate = "";
				if(this.fullPlan[i].date) {
					console.log('pushed 1');
					newDate = this.fullPlan[i].date;
				} else {
					if(this.fullPlan[i-1].run == 3) {
						console.log('day 3');
						newDate = this.addDays(datesArray[i-1], 3);
					} else {
						newDate = this.addDays(datesArray[i-1], 2);
					}
				}

				datesArray.push(newDate);
			}
			return datesArray;
		},
	},
	methods: {
		addDays(prevDate, daysToAdd) {
			console.log('prevDate: ',prevDate);
			console.log('daysToAdd: ',daysToAdd);
			let newDate = new Date(prevDate);
			newDate.setDate(newDate.getDate() + daysToAdd);
			newDate.toISOString().substring(0,10);

			return newDate.toISOString().substring(0,10);
		},
		formatDate(thisDate) {
			if(!thisDate) return false;
			let dateArray = thisDate.split('-');
			return dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0].slice(2,4);
		},
		toggleSettings() {
			this.settingsOpen = !this.settingsOpen;
		},

		storeData() {
			var saveData = JSON.stringify({
				theFullPlan: this.fullPlan,
				theSettings: this.settings,
			});
			localStorage.setItem('jamie_c25k', saveData);
			console.log('saved!');
		},
		getData() {
			var loadData = JSON.parse(localStorage.getItem('jamie_c25k'));
			console.log('loadData: ', loadData);
			if(loadData) {
				this.fullPlan = loadData.theFullPlan;
				this.settings = loadData.theSettings;
			}
		},
		removeData() {
			localStorage.removeItem('jamie_c25k');
		},
	},
	watch: {
		fullPlan: {
			deep: true,
			handler() {
				this.storeData();
			}
		},
		settings: {
			deep: true,
			handler() {
				this.storeData();
			}
		}
	},
	mounted() {
		this.getData();
	}
});
