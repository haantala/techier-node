const client = require('../../database');
const ResponseHelpers = require('../../Helper/ResponseHelper');

const insertDataService = async (data,res) => {
    try {
      const { firstName, lastName, email, password,mobile } = data;
        const insertData = await client.query(
          'INSERT INTO data (firstName, lastName, email, password, mobile) VALUES ($1, $2, $3,$4,$5) RETURNING *',
          [firstName, lastName, email, password,mobile]
        );  
        if (insertData?.rows.length !== 0) {
            console.log("dsssdds");
            
            return ResponseHelpers.serviceToController(1, insertData.rows[0],"Data added Successfully");
        } else {
            return ResponseHelpers.serviceToController(0,[],"Data Not added Successfully");
        }
    
    } catch (error) {
      console.log('=================== ERROR FROM insertData SERVICE ===================');
      console.log(error);
      return ResponseHelpers.serviceToController(4, [], 'ERROR FROM insertData SERVICE CATCH');
    }
  };



  const getDataService = async (data,res) => {
    try {
      const getData = await client.query('SELECT * FROM data'); 
        if (getData?.rows.length !== 0) {
            console.log("dsssdds");
            
            return ResponseHelpers.serviceToController(1, getData.rows,"Data Got Successfully");
        } else {
            return ResponseHelpers.serviceToController(0,[],"Data Not Get Successfully");
        }
    
    } catch (error) {
      console.log('=================== ERROR FROM getData SERVICE ===================');
      console.log(error);
      return ResponseHelpers.serviceToController(4, [], 'ERROR FROM getData SERVICE CATCH');
    }
  };


  const updateDataService = async (data,res) => {
    try {
      const { firstname, lastname, email, password,mobile , data_id} = data;
        const updateData = await client.query(
            'UPDATE data SET firstname = $1, lastname = $2, email = $3, password=$4, mobile=$5 WHERE data_id = $6 RETURNING *',
            [firstname, lastname, email, password,mobile, data_id]
          );
        if (updateData?.rows.length !== 0) {
            console.log("dsssdds");
            
            return ResponseHelpers.serviceToController(1, updateData.rows[0],"Data Updated Successfully");
        } else {
            return ResponseHelpers.serviceToController(0,[],"Data Not Updated Successfully");
        }
    } catch (error) {
      console.log('=================== ERROR FROM updateData SERVICE ===================');
      console.log(error);
      return ResponseHelpers.serviceToController(4, [], 'ERROR FROM updateData SERVICE CATCH');
    }
  };

  const deletedataService = async (data,res) => {
    try {
      const { data_id} = data;
        await client.query('DELETE FROM data WHERE data_id = $1', [data_id]);
        return ResponseHelpers.serviceToController(1, null,"Data Deleted Successfully");
        
    } catch (error) {
      console.log('=================== ERROR FROM deleteData SERVICE ===================');
      console.log(error);
      return ResponseHelpers.serviceToController(4, [], 'ERROR FROM deletedata SERVICE CATCH');
    }
  };

  module.exports = {
    insertDataService,
    getDataService,
    updateDataService,
    deletedataService
    
  };