
import { ModalForm, } from '@components/comm';
import useModalForm from '@/pages/_hooks/useModalForm';

export default ({ NS, editConfig, loading, ...props }) => {
	const [modalProps] = useModalForm(props, NS, editConfig, loading);
	return <ModalForm {...modalProps} />
}