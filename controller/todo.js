const Todo = require('../model/todoList.js');
const TodoComp = require('../model/todoListComp.js');

exports.getFavStar = (req,res,next)=> {
    const id = req.params.listId;

    Todo.findById(id)
        .then(lst => {
            if(lst.fav===true){
                lst.fav=false;
            }
            else{
                lst.fav=true;
            }

            return lst.save();
        })
        .then(newList => {
            res.redirect('/task')
        })
        .catch(err => {
            console.log(err);
        })
}


exports.getPage = (req,res,next) =>{

    let compL=[];
    let list=[];
    let tit = req.params.title;
    if(!tit){
        tit="Task";
    }

    // console.log("redirect");
    // // console.log(req.user);
    // req.user.populate('compList.listIdC')
    //         .then(user => {
    //             req.user.populate('todoList.listId')
    //                     .then(user => {
    //                         list = user.todoList;
    //                         compL=user.compList;
    //                         res.render('todo.pug',{
    //                             lst:list,
    //                             listComp:compL,
    //                             title:tit,
    //                             cnt:1,
    //                             cnt1:1
    //                         })
    //                     })
                
    //         })
        
    
    TodoComp.find({userId:req.user})
        .then(lst => {
            compList = lst;
            return;
        })
        .then(() => {
            return Todo.find({userId:req.user});
        })
        .then(list => {
            if(tit==="Important"){
               return Todo.find({userId:req.user,fav:true});
            }
            else{
                return list
            }
        })
        .then(list => {
            res.render('todo.pug',{
                lst:list,
                listComp:compList,
                title:tit,
                cnt:1,
                cnt1:1
            })
            
        })
        .catch (err =>{
            console.log(err);
        })

}



exports.postDescription = (req,res,next) => {
    let des = req.body.desc;
    let title = req.body.tit;
    // console.log(title);
    let favourite = false;
    
    if(title==="Important"){
        favourite = true;
    }
    
    let item = new Todo({
        desc: des,
        fav : favourite,
        userId:req.user
    });

    item.save()
        .then(result=>{
            console.log('saved item succussfully');
            // console.log(result);
            res.redirect(`${'/'+title}`);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postDelete = (req,res,next) => {
    const id = req.body.listId;
    let des;
    Todo.findById(id)
        .then(list => {
            des=list;
            return ;
        })
        .then(()=>{
            const compList = new TodoComp({
                desc : des.desc,
                userId:req.user
            })
    
            return compList.save()
            
        })
        .then(res1 => {
            return Todo.findByIdAndRemove(id);
        })
        .then(res2 => {
            res.redirect('/task');
        })
        .catch(err => {
            console.log(err);
        })


}

exports.postDeleteComp = (req,res,next) => {
    const id = req.body.compId;

    TodoComp.findByIdAndRemove(id)
        .then(res1 => {
            res.redirect('/task');
        })
        .catch(err => {
            console.log(err);
        })
}
