import { Table } from "antd";

export default (props) => {
	return (
		<Table rowKey={(_, index) => index} {...props} />
	);
}
