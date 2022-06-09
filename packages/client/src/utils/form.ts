export function onFormChange(value: any, formKey: string, setState: any, form: any) {
  setState({ ...form, [formKey]: value });
}
