
import { ModalForm, } from '@components/comm';
import useModalForm from '@/pages/_list/hooks/useModalForm';

export default (props) => {
	const [modalProps] = useModalForm(props);
	return <ModalForm {...modalProps} />
}