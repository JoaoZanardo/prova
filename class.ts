interface IMedicine {
    id?: number
    
    name: string
    type: string
}

class Medicine {
    private _id: number
    private _name: string
    private _type: string

    constructor (medicine: IMedicine) {
        this._id = medicine.id || Math.floor(Math.random() * 11001)
        this._name = medicine.name
        this._type = medicine.type
    }

    get id (): IMedicine['id'] {
        return this._id
    }

    get toString (): string {
        return JSON.stringify(this.object) 
    }

    get object (): IMedicine {
        return {
            id: this._id,
            name: this._name,
            type: this._type
        }
    }
}

interface IPatient {
    id?: number

    name: string
    medicines: Array<Medicine>
}

class Patient {
    private _id: number
    private _name: string
    private _medicines: Array<Medicine>

    constructor (patient: IPatient) {
        this._id = patient.id || Math.floor(Math.random() * 11001)
        this._name = patient.name        
        this._medicines = patient.medicines        
    }

    get id (): IPatient['id'] {
        return this._id
    }

    get medicines (): IPatient['medicines'] {
        return this._medicines
    }

    get toString (): string {
        return JSON.stringify(this.object) 
    }

    addMedicine (medicine: Medicine): void {
        this._medicines.push(medicine)
    }

    removeMedicineById (medicineId: number): void {
        const medicine = this.getMedicineById(medicineId)

        const index = this._medicines.indexOf(medicine)

        this._medicines.splice(index, 1)
    }

    getMedicineById (medicineId: number): Medicine {
        const medicine = this._medicines.find(medicine => medicine.id === medicineId)
        if (!medicine) throw new Error('Medicamento não cadastrado!')

        return medicine
    }

    get object (): IPatient {
        return {
            id: this._id,
            name: this._name,
            medicines: this._medicines
        }
    }
}

interface IChangeMedicineOwnerProps {
    originPatientId: number
    destinyPatientId: number
    medicineId: number    
}

class Main {
    private _patients: Array<Patient> = []

    addPatient (patient: Patient): void {
        this._patients.push(patient)
    }

    addMedicineByPatientId (patientId: number, medicine: Medicine) {
        const patient = this.findPatientById(patientId)

        patient.medicines.push(medicine)
    }

    changeMedicineOwner ({
        originPatientId,
        destinyPatientId,
        medicineId
    }: IChangeMedicineOwnerProps): void {
        const originPatient = this.findPatientById(originPatientId)
        this.findPatientById(destinyPatientId)

        const medicine = originPatient.getMedicineById(medicineId)
        originPatient.removeMedicineById(medicineId)

        this.addMedicineByPatientId(destinyPatientId, medicine)
    }

    findAllPatientes (): Array<Patient> {
        return this._patients
    }

    private findPatientById (patientId): Patient {
        const patient = this._patients.find(patient => patient.id === patientId)
        if (!patient) throw new Error('Paciente não cadastrado!')

        return patient
    }
}

const medicine = new Medicine({
    id: 1,
    name: 'DorFlex',
    type: 'Analgésico'
})

const medicine2 = new Medicine({
    id: 2,
    name: 'Azitromicina',
    type: 'Antibiótico'
})

const patient = new Patient({
    id: 1,
    name: 'João',
    medicines: []
})

const patient2 = new Patient({
    id: 2,
    name: 'Tobias',
    medicines: []
})

const main = new Main()
main.addPatient(patient)
main.addMedicineByPatientId(1, medicine)
main.addMedicineByPatientId(1, medicine2)
console.log(main.findAllPatientes())
main.addPatient(patient2)
main.changeMedicineOwner({
    originPatientId: 1,
    destinyPatientId: 2,
    medicineId: 1
})
console.log(main.findAllPatientes())