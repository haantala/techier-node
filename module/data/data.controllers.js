const { insertDataService, getDataService, updateDataService, deletedataService } = require("./data.services");
const ResponseHelpers = require('../../Helper/ResponseHelper');

const insertDataController = async (req, res) => {
    try {
        const data = await insertDataService(req.body,res);
        if (data.status === 1) {
            ResponseHelpers.success(res, data.data, data.description);
          } else if (data.status === 2) {
            ResponseHelpers.error(res, data.description);
          } else if (data.status === 3) {
            ResponseHelpers.badRequest(res, data.description);
          } else if (data.status === 4) {
            ResponseHelpers.InternalServerError(res, data.description);
          } 
    } catch (error) {
        ResponseHelpers.InternalServerError(res, 'Something Went Wrong, Please Try Again. ');
      
    }
  };

  const getDataController = async (req, res) => {
    try {
        const data = await getDataService();
        if (data.status === 1) {
            ResponseHelpers.success(res, data.data, data.description);
          } else if (data.status === 2) {
            ResponseHelpers.error(res, data.description);
          } else if (data.status === 3) {
            ResponseHelpers.badRequest(res, data.description);
          } else if (data.status === 4) {
            ResponseHelpers.InternalServerError(res, data.description);
          } 
    } catch (error) {
        ResponseHelpers.InternalServerError(res, 'Something Went Wrong, Please Try Again. ');
      
    }
  };


const updateDataController = async (req, res) => {
    try {
        const data = await updateDataService(req.body,res);
        if (data.status === 1) {
            ResponseHelpers.success(res, data.data, data.description);
          } else if (data.status === 2) {
            ResponseHelpers.error(res, data.description);
          } else if (data.status === 3) {
            ResponseHelpers.badRequest(res, data.description);
          } else if (data.status === 4) {
            ResponseHelpers.InternalServerError(res, data.description);
          } 
    } catch (error) {
        ResponseHelpers.InternalServerError(res, 'Something Went Wrong, Please Try Again. ');
      
    }
  };

  const deleteDataController = async (req, res) => {
    try {
        const data = await deletedataService(req.body,res);
        if (data.status === 1) {
            ResponseHelpers.success(res, data.data, data.description);
          } else if (data.status === 2) {
            ResponseHelpers.error(res, data.description);
          } else if (data.status === 3) {
            ResponseHelpers.badRequest(res, data.description);
          } else if (data.status === 4) {
            ResponseHelpers.InternalServerError(res, data.description);
          } 
    } catch (error) {
        ResponseHelpers.InternalServerError(res, 'Something Went Wrong, Please Try Again. ');
      
    }
  };



  module.exports={
    insertDataController,
    getDataController,
    updateDataController,
    deleteDataController
  }