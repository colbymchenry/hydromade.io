import { useForm } from "react-hook-form";
import { LayoutBasic } from "../../components/layouts/LayoutBasic";

export default function Signup(props) {

    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm();

    return (
        <LayoutBasic>

        </LayoutBasic>
    )

}