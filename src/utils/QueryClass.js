
class QueryClass {
  constructor(dbName) {
    this.dbName = dbName;
  }

  /**
   * @name findAll
   * @description retrieve all data from a specific database
   * @param {object} condition
   * @returns Array<object>
   */
  findAll(includes) {
    try {
      return this.dbName.findAll(includes);
    } catch (error) {
      return error;
    }
  }
  /**
   * @name count
   * @description count all data from a specific database
   * @param {object} condition
   * @returns Integer
   */
  count(includes) {
    try {
      return this.dbName.count(includes);
    } catch (error) {
      return error;
    }
  }

  /**
   * @name findOne
   * @description query a specific record that matches the provided conditions
   * @param {object} condition
   * @returns
   */
  findOne(condition, includes) {
    try {
      return this.dbName.findOne({ where: condition }, includes);
    } catch (error) {
      return error;
    }
  }

  /**
   * @name delete
   * @description delete a record which satisfies the provided query
   * @param {object} condition
   * @returns
   */
  delete(condition) {
    try {
      return this.dbName.destroy({ where: condition });
    } catch (error) {
      return error;
    }
  }

  /**
   * @name update
   * @description update a record which satisfies the provided conditions
   * @param {object} reqBody - the records to update
   * @param {object} condition - the conditions to match this record
   * @returns
   */
  update(reqBody, condition) {
    try {
      return this.dbName.update(reqBody, {
        where: condition,
        fields: Object.keys(reqBody),
      });
    } catch (error) {
      return error;
    }
  }

  /**
   * @name create
   * @description create a new record in the db
   * @param {object} reqBody - the record to insert into the database
   * @returns
   */
  create(reqBody) {
    try {
      return this.dbName.create(reqBody);
    } catch (error) {
      return error;
    }
  }
}

export default QueryClass;
