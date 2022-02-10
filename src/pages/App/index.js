import ImpLossTable from '../../components/ImpLossTable'
import ButtonGroupWrapper from '../../components/ButtonGroupAndSliders'
import InputsForm from '../../components/InputsForm'
import AppTitle from '../../components/AppTitle'
import styles from '../../css/app.module.css'
const AppWrapper = () => {
  return (
    <div>
      <div className={styles.content}>
        <AppTitle />
        <InputsForm />
        <ImpLossTable />
        <ButtonGroupWrapper />
      </div>
    </div>
  )
}

export default AppWrapper
