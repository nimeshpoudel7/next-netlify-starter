import { Select, Button, Avatar, Badge } from "antd";
import { useEffect } from "react";

const { Option } = Select;
const Formcourse = ({
  handleSubmit,
  handleImage,
  handleChange,
  setValues,
  values,
  highLightImage,
  captionText,
  handleDelete,
  edit = false,
}) => {
  const dropdownvalue = [];
  for (let j = 5; j <= 100; j++) {
    dropdownvalue.push(<Option key={j.toFixed(3)}>${j.toFixed(3)}</Option>);
  }
  const CategoryValue = [
    <Option key={"education"}>Education</Option>,
    <Option key={"technology"}>Technology</Option>,
    <Option key={"math"}>Math</Option>,
    <Option key={"other"}>Other</Option>,
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='text'
          name='name'
          className='form-control'
          placeholder='Name'
          value={values.name}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <textarea
          name='description'
          cols='5'
          rows='5'
          value={values.description}
          className='form-control'
          onChange={handleChange}></textarea>
      </div>

      <div className='form-row mb-2'>
        <div className='col-xl-2'>
          <div className='form-group'>
            <Select
              style={{ width: "100%" }}
              size='large'
              value={values.paid}
              onChange={(val) =>
                setValues({ ...values, paid: val, price: "0" })
              }>
              <Option value={true}>Paid</Option>
              <Option value={false}>Free</Option>
            </Select>
          </div>
        </div>
        {values.paid && (
          <div className='col-xl-2'>
            {edit ? (
              <>
                <Select
                  defaultValue={values.price}
                  style={{ width: "100%" }}
                  onChange={(data) => setValues({ ...values, price: data })}
                  size='large'
                  tokenSeparators={[,]}>
                  {dropdownvalue}
                </Select>
              </>
            ) : (
              <Select
                defaultValue='$5'
                style={{ width: "100%" }}
                onChange={(data) => setValues({ ...values, price: data })}
                size='large'
                tokenSeparators={[,]}>
                {dropdownvalue}
              </Select>
            )}
          </div>
        )}
      </div>
      {edit ? (
        <div className='form-group'>
          <Select
            defaultValue={values.CategoryType}
            mode='multiple'
            name='CategoryType'
            style={{ width: "33%" }}
            placeholder='Please select'
            size='large'
            onChange={(data) => setValues({ ...values, CategoryType: data })}>
            {CategoryValue}
          </Select>
        </div>
      ) : (
        <div className='form-group'>
          <Select
            mode='tags'
            name='CategoryType'
            style={{ width: "33%" }}
            placeholder='Tags'
            size='large'
            onChange={(data) => setValues({ ...values, CategoryType: data })}>
            {CategoryValue}
          </Select>
        </div>
      )}

      <div className='form-row'>
        <div className='col'>
          <div className='form-group'>
            <label className='btn btn-outline-secondary btn-block text-left'>
              {captionText}
              <input
                type='file'
                name='image'
                onChange={handleImage}
                accept='image/*'
                hidden
              />
            </label>
          </div>
        </div>
        {highLightImage && (
          <Badge count='X' onClick={handleDelete} className='pointer'>
            <Avatar width={200} size={80} src={highLightImage} />
          </Badge>
        )}
        {edit && values.upoadlImage && (
          <Avatar width={200} size={80} src={values.upoadlImage.Location} />
        )}
      </div>
      <div className='row'>
        <div className='col'>
          <Button
            onClick={handleSubmit}
            disabled={values.loading || values.uploading}
            className='btn btn-primary'
            loading={values.loading}
            type='primary'
            size='large'
            shape='round'>
            {values.loading ? "Saving..." : "Save & Continue"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Formcourse;
