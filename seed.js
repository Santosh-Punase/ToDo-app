var statusENUM = {
    ACTIVE:"ACTIVE",
    COMPLETE:"COMPLETE",
    DELETE:"DELETE"
};

var todos = {
    1 : {title : "Learn javascript",status: statusENUM.ACTIVE},
    2 : {title : "Git tutorial",status: statusENUM.ACTIVE},
    3 : {title : "Interactive Git",status: statusENUM.ACTIVE},
}

var next_todo_id = 4;

module.exports = {
    statusEnum : statusENUM,
    todos : todos,
    next_todo_id : next_todo_id
}