

module.exports = async(req,res,next) => {
    // console.log(req.query);

    //?filter
    // url?filter[name]=value
    const filter = req.query?.filter || {};
    // console.log(filter);

    //?Search
    const search = req.query?.search || {};
    //{ "<field>": { "$regex": "pattern", "$options": "<options>" } }

    for (let key in search) {
      search[key] = { $regex: search[key], $options: "i" };
    }

    // console.log(search);

    //?sorting
    const sort = req.query?.sort || {};
    // console.log(sort);

    //?page
    let limit = Number(req.query?.limit);
    limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 12);

    let page = Number(req.query?.page || 1);
    page = page > 0 ? page : 1;

    let skip = Number(req.query?.skip || 0);

    skip = skip > 0 ? skip : (page - 1) * limit;

  

    res.getListModel = async (Model, populate = null) => {
      return await Model.find({ ...filter, ...search })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate(populate);
    };
    res.getListModelDetails = async (Model) => {
      const data = await Model.find({ ...filter, ...search });
      let details = {
        filter,
        search,
        sort,
        limit,
        skip,
        page,
        pages: {
          previous: page > 1 ? page - 1 : false,
          current: page,
          next: page + 1,
          totalPage: Math.ceil(data.length / limit),
        },
        totalrecords: data.length,
      };
      if (details.page >= details.pages.totalPage) {
        details.pages.next = false;
      }

      if (details.limit >= details.totalrecords) {
        details.pages = false;
      }

      return details;
    };




    next();
}