import React from 'react';
import './page.less';
/**
 *  分页插件
 *  @param total // 总条数
 *  @param page // 当前页
 *  @param pageSize // 一页多少条
 *  @param fastPage // 是否有上一页 或者 下一页
 *  @param onPageChange // 回调函数 页数改变时触发
 *  @param onPageSize // 回调函数，一页多少条时改变
 * **/
class Pagination extends React.Component{
    constructor(props){
        super(props);
        let params = {
            total: 0, // 总条数
            page: 1, // 当前页
            pageSize: 7, // 一页多少条
            totalArray: [],
            activeIndex: 1,
            fastPage: true, // 是否 上一页 和 下一页
            defaultNum: 7,
            pageNum: 0, //总共多少页
            jumpValue:'',
            isPrev:false,
            isNext:false    
        }
        this.state = Object.assign(params,this.props);
        this.nextHandle = this.nextHandle.bind(this);
        this.prevHandle = this.prevHandle.bind(this);
        this.pageInit = this.pageInit.bind(this);
        this.init = this.init.bind(this);
        this.jumpLeave = this.jumpLeave.bind(this); 
        this.set = this.set.bind(this)
        this.propagation = this.propagation.bind(this) 
         
    }
    init(){ // 初始化整个函数
        let pageNum = Math.ceil( this.state.total / this.state.pageSize );
    return new Promise((resolve, reject) => {
        this.setState({pageNum: pageNum},()=>{
            resolve()
        })
    })
}
jumpLeave(e){
    let _this = this;
    if(e.keyCode == 13) {
        if(this.state.jumpValue) {
            let num = Number(this.state.jumpValue)
            this.setState({activeIndex:num},()=>{
                _this.pageInit();
            })
        }
    }
}
pageInit(){
 
    let pageNum = this.state.pageNum;
    let totalArr = [];
    /**
     *  默认展示 10 条
     *  12345678910
     * **/
    let intervalNumber = this.state.defaultNum;
    if(pageNum >= intervalNumber) {
        let arr = [],arr1 = [],arr2 = [];
        if(this.state.activeIndex > intervalNumber && this.state.activeIndex < pageNum - intervalNumber){ // 取中间部分
            // arr1.push( this.state.activeIndex - 5 )
            // arr1.push( this.state.activeIndex - 4 )
            arr1.push( this.state.activeIndex - 3 )
            arr1.push( this.state.activeIndex - 2 )
            arr1.push( this.state.activeIndex - 1 )
            arr1.push( this.state.activeIndex )
            arr1.push( this.state.activeIndex + 1 )
            arr1.push( this.state.activeIndex + 2 )
            arr1.push( this.state.activeIndex + 3 )
            // arr1.push( this.state.activeIndex + 4 )
        } else if( this.state.activeIndex <= intervalNumber ) { // 取开头部分
            for( let i =0; i< pageNum; i++ ) {
                if(i == intervalNumber || i+1 == pageNum) {
                    break;
                }
                arr1.push(i+1);
            }
        } else if( this.state.activeIndex >= pageNum - intervalNumber ) { // 取末尾部分
            for( let i = pageNum - intervalNumber; i< pageNum; i++ ) {
                if(i == pageNum) {
                    break;
                }
                
                arr1.push(i);
            }
        }
        totalArr = totalArr.concat(arr,arr1,arr2)
    } else {
        for(let i=0; i<pageNum; i++) {
            totalArr.push(i+1)
        }
    }
 
    this.setState({totalArray:totalArr});
} 
UNSAFE_componentWillUpdate( prevState,state ){
    // console.log(prevState,state, 9999)
}
UNSAFE_componentWillMount(){ // 相当于mouted
    this.init().then(() => {
        this.pageInit()
    });
}
set(){
    this.setState({
        isPrev:false,
        isNext:false
    });
}
propagation(e){
    e.stopPropagation();
}
componentDidMount(){
    document.body.addEventListener('click',this.set,true);//为body元素添加点击事件，在点击body时取消Button选中样式  
    // document.getElementById('prev').addEventListener('click',this.propagation,true)
    // document.getElementById('next').addEventListener('click',this.propagation,true)
    this.setState({
        total:this.props.total,
        page:this.props.currentPage
    })
}
componentWillUnmount() {
    document.body.removeEventListener('click',this.set,true);   
    // document.getElementById('prev').removeEventListener('click',this.propagation,true)
    // document.getElementById('next').removeEventListener('click',this.propagation,true)
}
UNSAFE_componentWillReceiveProps(props){ // props 改变时 触发的函数
    setTimeout(()=>{
        this.state = Object.assign(this.state,this.props);
        this.init().then(() => {
            this.pageInit()
        });
    },0)
    this.setState({//筛选条件后初始化页码
        activeIndex:this.props.currentPage
    })
}
nextHandle(event){
    let _this = this;
    if( this.state.activeIndex < this.state.pageNum ) {
        let index = this.state.activeIndex + 1;       
        this.setState({activeIndex:index,isNext:true,isPrev:false}, ()=>{
            _this.props.onPageChang(index);
            _this.pageInit();
        })
    }
}
prevHandle(event){
    let _this = this;
    if( this.state.activeIndex > 1 ) {
        let index = this.state.activeIndex - 1;
        this.setState({activeIndex:index,isNext:false,isPrev:true}, ()=>{
            _this.props.onPageChang(index);
            _this.pageInit();
        })
    }
}
itemClick(item,index){
    let _this = this;
    let num = this.state.activeIndex;
    if( item == index > 2 ){
        num += 5;
    } 
    // else if(item ==  index < 5 ){
    //     num -= 5;
    // }
    else{
        num = item;
    }
    this.setState({activeIndex:num},()=>{
        _this.pageInit()
        _this.props.onPageChang(num);
    })
}
render(){
    const totalHtml = this.state.totalArray.map((item,index) => {
        let activeClass=  item == this.state.activeIndex ? 'text-active' : '';
        return (
            <span onClick={this.itemClick.bind(this,item,index)} key={index} className={`${activeClass}`}>
                {item}
            </span>
        )
    })
   
    
    const nextPage = <span id='next' disabled={this.state.activeIndex == this.state.pageNum} onClick={this.nextHandle} className={this.state.isNext ? 'span-active' : ''}>&gt;</span>
    const prevPage = <span  id='prev' disabled={this.state.activeIndex == 1}   onClick={this.prevHandle} className={this.state.isPrev ? 'span-active' : ''}>&lt;</span>
    return (
        <div id={'pagination'}>           
            <div className={'page-content'}>
                 <div className={'text-total'}>
                    共{this.state.total}项
                    每页{this.state.currentPageSize}项                    
                    共{this.state.totalPages}页
                </div>
                {prevPage}
                <div className={'text-content'}>
                    {totalHtml}
                </div>
                {nextPage}
            </div>
        </div>
    )
}
}
export default Pagination;