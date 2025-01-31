import { Text } from "@gravity-ui/uikit"

const ErrorBox = () => {

    return (
        <div style={{
            height: '200px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <img src="/error.png" height={60} />
            <Text>Qandaydir xato yuzaga keldi</Text>
        </div>
    )
}


export default ErrorBox