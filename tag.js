class TagJS {
	constructor(element) {
		this.tag = element;
		this.id  = tag.getAttribute("id") + "_" + Math.round(Math.random() * 1000000);
		
		let style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = `.tag-container {
				min-height: 30px; 
				padding: 2px 5px; 
				width: 300px; 
				border: 1px solid gray;
				border-radius: 5px;
			}
			.tag-input {
				border: none;
				outline: none;
				height: 30px;
			}
			.tag-tag {
				border-radius: 10px;
				font-family: Calibri;
				padding: 2px 5px;
				margin: 2px 5px;
				display: inline-block;
				cursor: pointer;
				border: 1px solid tomato;
			}
			.tag-tag:hover {
				font-weight: 600;
				color: tomato;
			}`;	
		document.getElementsByTagName('head')[0].appendChild(style);
		
		let select = document.createElement("select");
		select.multiple = true;
		select.setAttribute("id", this.id);
		select.style.display = "none";
		tag.appendChild(select);
		this.select = select;
		
		let container = document.createElement("div");
		container.classList.add("tag-container");
		this.tag.appendChild(container);
		this.container = container;
		
		let input = document.createElement("input");
		input.placeholder = "Agregue una etiqueta...";
		input.classList.add("tag-input");	
		input.onkeypress = function(e) {

			if(e.keyCode === 32 || e.keyCode === 13) {
				let text = input.value.trim();
				
				if(text != "") {
					let etiqueta = document.createElement("span");	
					etiqueta.classList.add("tag-tag");
					etiqueta.innerText = text;
					etiqueta.onclick = function() {
						this.remove();
						select.namedItem(this.innerHTML).remove();
					}	
					
					let option = document.createElement("option");
					option.value = text;
					option.id = text;
					option.selected = true;

					select.add(option);
					
					input.value = "";
					
					container.prepend(etiqueta);
				}
			}	
		}
		container.appendChild(input);
	}
	
	getAll() {
		
		let arr = []
		for(var i = 0; i < this.select.options.length; i++) {
			arr[i] = this.select.item(i).value;
		}
		
		return arr;
	}
	
	clear() {
		for(var i = this.select.options.length - 1; i >= 0 ; i--) {
			this.select.item(i).remove();
		}
		
		this.container.querySelectorAll("span").forEach(i => i.remove())
	}
}
	
// TODO
// https://medium.com/@parsyval/javascript-prototype-vs-class-a7015d5473b
// not duplicates
// dropdown
// custom classes