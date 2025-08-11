import React from "react";

const StudentForm = ({formData, setformData, handleSubmit, isEditMode}) =>
{
    return (
        <form onSubmit={handleSubmit} className="student-form">
  <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData
    ({ ...formData, name: e.target.value })} required />
  <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData
    ({ ...formData, email: e.target.value })} required />
  <input type="text" placeholder="Gender" value={formData.gender} onChange={(e) => setFormData
    ({ ...formData, gender: e.target.value })} />
    <input type="text" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData
    ({ ...formData, phone: e.target.value })}  />
    <input type="text" placeholder="Address" value={formData.address} onChange={(e) => setFormData
    ({ ...formData, address: e.target.value })} />
    <input type="text" placeholder="Contact" value={formData.contact} onChange={(e) => setFormData
    ({ ...formData, contact: e.target.value })}  />
    <input type="number" placeholder="User ID" value={formData.userId} onChange={(e) => setFormData
    ({ ...formData, userId: e.target.value })} />

    <button type="submit" className="submit-button" > { isEditMode ? 'UpdateStudent' : 'AddStudent'}</button>
</form>
    );
};

export default StudentForm;