const Form = require('../modals/Form');

module.exports = {
    addForm: addForm,
    fetchForm: fetchForm,
};

function addForm(req, res) {
    let form = new Form(req.body);
    form.save()
        .then(response => {
            res.status(200);
            return res.json({
                status: true,
                message: 'Form saved successfully!',
                data: response
            });
        })
        .catch(error => {
            res.status(200);
            return res.json({
                status: false,
                message: 'Unable to save form!',
                error: error
            });
        });
}

function fetchForm(req, res) {
    let query = {};
    if (req.query.form_name) {
        query = {
            form_name: { $regex: req.query.form_name, $options: 'i' }
        };
    }
    Form.find(query).then(response => {
        res.status(200);
        return res.json({
            status: true,
            message: 'Form fetched successfully!',
            data: response
        });
    }).catch(error => {
        res.status(200);
        return res.json({
            status: false,
            message: 'Unable to fetch form!',
            error: error
        });
    });
}