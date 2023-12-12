export interface IElement { 
	id: string;
	name: string;
	type: string;
	label: string;
	value: string;
	placeholder: string;
	required: boolean;
	options: Array<{ label: string; value: string }>;
	rules: Array<{ required: boolean; message: string }>;
	[key: string]: any;
}