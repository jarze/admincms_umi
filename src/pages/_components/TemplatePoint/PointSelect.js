import { forwardRef, useState, useEffect } from 'react';
import { Select } from 'antd';
import debounce from 'lodash.debounce';
// import { fuzzySearchPoint } from '@services/comm.js';

const { Option } = Select;

export default forwardRef(({ onChange, ...props }, ref) => {
	const [points, setPoints] = useState([]);
	const [loading, setLoading] = useState(false);
	const [mounted, setMounted] = useState(true);
	useEffect(() => {
		return () => {
			setMounted(false);
		};
	}, []);
	const handlePointSelect = t => {
		// 根据点位选择自动填充表单相关内容
		const rules = { ...points.find(item => item.name === t) };
		rules.point = rules.name;
		delete rules.name;
		onChange && onChange(t, rules);
	};

	const handlePointChange = debounce(va => {
		setLoading(true);
		// fuzzySearchPoint({ keyword: va })
		//   .then(res => {
		//     mounted && setPoints(res);
		//     mounted && setLoading(false);
		//   })
		//   .catch(err => {
		//     mounted && setLoading(false);
		//   });
	}, 0.5e3);

	return (
		<Select
			ref={ref}
			style={{ width: 90 }}
			onChange={va => handlePointSelect(va)}
			showSearch
			onSearch={handlePointChange}
			filterOption={false}
			loading={loading}
			{...props}
		>
			{points.map((item, index) => (
				<Option key={`${item.name}`} value={item.name}>
					{item.name}
				</Option>
			))}
		</Select>
	);
});
