import ImpLossTable from '../../components/ImpLossTable'
import ButtonGroupWrapper from '../../components/ButtonGroupAndSliders'
import InputsForm from '../../components/InputsForm'
import AppTitle from '../../components/AppTitle'
import '../../style/css/style.css'

const AppWrapper = () => {
  return (
    <div className="app-content">
      <AppTitle />
      <InputsForm />
      <ImpLossTable />
      <ButtonGroupWrapper />
    </div>
  )
}

export default AppWrapper
