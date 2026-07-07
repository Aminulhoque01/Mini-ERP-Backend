"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    modelQuery;
    query;
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchFields) {
        const searchTerm = this.query.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchFields.map(field => ({
                    [field]: {
                        $regex: searchTerm,
                        $options: "i",
                    },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = { ...this.query };
        const excludeFields = [
            "searchTerm",
            "sortBy",
            "sortOrder",
            "page",
            "limit",
        ];
        excludeFields.forEach(el => delete queryObj[el]);
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        const sortBy = this.query.sortBy || "createdAt";
        const sortOrder = this.query.sortOrder || "-1";
        const sort = sortOrder === "asc"
            ? sortBy
            : `-${sortBy}`;
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    async countTotal() {
        const filter = this.modelQuery.getFilter();
        const total = await this.modelQuery.model.countDocuments(filter);
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        return {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        };
    }
}
exports.default = QueryBuilder;
//# sourceMappingURL=QueryBuilder.js.map