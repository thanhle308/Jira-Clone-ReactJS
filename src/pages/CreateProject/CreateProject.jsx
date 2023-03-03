import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect, useSelector, useDispatch } from 'react-redux';
import { CREATE_PROJECT_SAGA, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../redux/types/Jirabugs/JirabugsType';

function CreateProject(props) {
  const { arrProjectCategory } = useSelector(state => state.ProjectCategoryReducer);
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  useEffect(() => {
    //GỌI API để láy dữ liệu thẻ select
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_SAGA,
    })
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue('description', content)
  }

  return (
    <div className='container m-5'>
      <h1 className='mb-4'>CreateProject</h1>
      <form className="container" onSubmit={handleSubmit} onChange={handleChange}>
        <div className="form-group">
          <p>Name</p>
          <input className='form-control' name='projectName' />
        </div>

        <div className="form-group">
          <p>Discription</p>
          <Editor
            name='description'
            initialValue=""
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={handleEditorChange}
          />
        </div>

        <div className="form-group">
          <select name="categoryId" className='form-control' onChange={handleChange}>
            {arrProjectCategory.map((item, index) => {
              return <option value={item.id} key={index}>{item.projectCategoryName}</option>
            })}
          </select>
        </div>
        <button className='btn btn-outline-primary' type='submit'>Create New Project</button>
      </form>
    </div>
  )
}

const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: '',
      description: '',
      categoryId: props.arrProjectCategory[0]?.id,
    }
  },
  validationSchema: Yup.object({

  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('value ne', values)
    props.dispatch({
      type: CREATE_PROJECT_SAGA,
      newProject: values
    })
  },

  displayName: 'createProjectForm',
})(CreateProject);

const mapStateToProps = (state) => {
  return {
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
  }
}
export default connect(mapStateToProps)(createProjectForm);
