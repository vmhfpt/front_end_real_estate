import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProjectService from "../../../service/project.service";
import CommentService from "../../../service/comment.service";
import SearchComponent from "../tabSearch/search";
import {useSelector} from "react-redux";
import {getLogin} from "../user/selectLogin";
function ProjectDetail() {
  const checkUser = useSelector(getLogin);
 
  const params = useParams();
  const [dataItem, setDataItem] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [suggest, setSuggest] = useState(false);
  
  useEffect(() => {
    const getProject = async () => {
      const response = await ProjectService.show(params.slug);
      if (response) {
        setDataItem(response.data);
        setSuggest(response.suggest);
      }
    };
    getProject();
  }, [params]);
  const postComment = async () => {
       if(checkUser.isLogin){
          if( content !== ''){
            const dataComment = await CommentService.create({name : checkUser.isLogin ? checkUser.name : name, email : checkUser.isLogin ? checkUser.email : email, content : content, project_id : dataItem._id});
            setDataItem((prev) => {
             return {...prev,
               comment : [...prev.comment, dataComment.data] }
            });
            setName('');
            setContent('');
            setEmail('');
          }
       }else {
         if(name !== '' && email !== '' && content !== ''){
          const dataComment = await CommentService.create({name : checkUser.isLogin ? checkUser.name : name, email : checkUser.isLogin ? checkUser.email : email, content : content, project_id : dataItem._id});
          setDataItem((prev) => {
           return {...prev,
             comment : [...prev.comment, dataComment.data] }
          });
          setName('');
          setContent('');
          setEmail('');
         }
       }
   
  }

  return (
    <div>
      <section id="aa-property-header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="aa-property-header-inner">
                <h2>Chi ti???t d??? ??n</h2>
                <ol className="breadcrumb">
                  <li>
                    <Link to="">HOME</Link>
                  </li>
                  <li className="active">{dataItem.name}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="aa-blog">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="aa-blog-area">
                <div className="row">
                  <div className="col-md-8">
                    <div className="aa-blog-content">
                      <div className="row">
                        <div className="col-md-12">
                          <article className="aa-blog-single aa-blog-details">
                            <figure className="aa-blog-img">
                              <Link to="">
                                <img alt="img" src={dataItem.thumb} />
                              </Link>
                              <span className="aa-date-tag">
                                {dataItem.updatedAt}
                              </span>
                            </figure>
                            <div className="aa-blog-single-content">
                              <h2>{dataItem.title}</h2>
                              <div className="aa-blog-single-bottom">
                                <Link className="aa-blog-author" to="">
                                  <i className="fa fa-user"></i> Admin
                                </Link>
                                <Link className="aa-blog-comments" to="">
                                  <i className="fa fa-comment-o"></i>6
                                </Link>
                              </div>

                              <p>N???i dung d??? ??n {dataItem.name}</p>

                              <aside className="aa-blog-sidebar">
                                <div className="aa-blog-sidebar-single">
                                  <h3>L???a ch???n</h3>
                                  <div className="tag-cloud">
                                    <Link to="">Apartment</Link>
                                    <Link to="">Propery</Link>
                                    <Link to="">Residential</Link>
                                    <Link to="">Commercial</Link>
                                    <Link to="">Office</Link>
                                    <Link to="">Rent</Link>
                                    <Link to="">Sale</Link>
                                    <Link to="#faq">FAQ</Link>
                                  </div>
                                </div>
                              </aside>

                              <blockquote>
                                <p> Gi???i thi???u chung</p>
                              </blockquote>
                              <div
                                className="image_custom"
                                dangerouslySetInnerHTML={{
                                  __html: dataItem.description,
                                }}
                              ></div>
                              
                              {dataItem && (
                                <table>
                                  <tbody>
                                    <tr>
                                      <th>T??n th????ng m???i</th>
                                      <td>{dataItem.name}</td>
                                    </tr>
                                    <tr>
                                      <th>V??? tr??</th>
                                      <td>
                                        {dataItem.project_value_id.position}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Ch??? ?????u t??</th>
                                      <td>
                                        {dataItem.project_value_id.investor}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>T???ng th???u x??y d???ng</th>
                                      <td>
                                        {
                                          dataItem.project_value_id
                                            .contractor_sum
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>????n v??? ph??n ph???i</th>
                                      <td>
                                        {
                                          dataItem.project_value_id
                                            .distribution_unit
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Thi???t k???</th>
                                      <td>
                                        {dataItem.project_value_id.design}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>T???ng di???n t??ch</th>
                                      <td>
                                        {dataItem.project_value_id.area_sum}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Quy m??</th>
                                      <td>{dataItem.project_value_id.scale}</td>
                                    </tr>
                                    <tr>
                                      <th>Lo???i c??n h???</th>
                                      <td>
                                        {
                                          dataItem.project_value_id
                                            .apartment_type
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Di???n t??ch c??c lo???i</th>
                                      <td>
                                        {dataItem.project_value_id.area_type}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Ti???n ??ch</th>
                                      <td>
                                        {dataItem.project_value_id.utility}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Kh???i c??ng - b??n giao</th>
                                      <td>
                                        {dataItem.project_value_id.start_up}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Ph??p l??</th>
                                      <td>{dataItem.project_value_id.law}</td>
                                    </tr>
                                    <tr>
                                      <th>Gi?? b??n</th>
                                      <td>
                                        {dataItem.project_value_id.price_sale}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              )}

                              <blockquote>
                                <p> Ch??? ?????u t??</p>
                              </blockquote>
                              <div
                                className="image_custom"
                                dangerouslySetInnerHTML={{
                                  __html: dataItem.investor,
                                }}
                              ></div>

                              <blockquote>
                                <p> V??? tr??</p>
                              </blockquote>
                              <div
                                className="image_custom"
                                dangerouslySetInnerHTML={{
                                  __html: dataItem.position,
                                }}
                              ></div>

                              <blockquote>
                                <p> Ti???n ??ch</p>
                              </blockquote>
                              <div
                                className="image_custom"
                                dangerouslySetInnerHTML={{
                                  __html: dataItem.utility,
                                }}
                              ></div>

                              <blockquote>
                                <p> M???t b???ng</p>
                              </blockquote>
                              <div
                                className="image_custom"
                                dangerouslySetInnerHTML={{
                                  __html: dataItem.ground_floor,
                                }}
                              ></div>

                              <blockquote>
                                <p> Gi?? b??n</p>
                              </blockquote>
                              <div
                                className="image_custom"
                                dangerouslySetInnerHTML={{
                                  __html: dataItem.price,
                                }}
                              ></div>

                              <blockquote>
                                <p> Ph????ng th???c thanh to??n</p>
                              </blockquote>
                              <div
                                className="image_custom"
                                dangerouslySetInnerHTML={{
                                  __html: dataItem.pay_method,
                                }}
                              ></div>

                              <blockquote>
                                <p> Ti???n ????? x??y d???ng</p>
                              </blockquote>
                              <div
                                className="image_custom"
                                dangerouslySetInnerHTML={{
                                  __html: dataItem.progress,
                                }}
                              ></div>

                              <blockquote>
                                <p> Nh?? m???u</p>
                              </blockquote>
                              <div
                                className="image_custom"
                                dangerouslySetInnerHTML={{
                                  __html: dataItem.example_house,
                                }}
                              ></div>

                              <blockquote>
                                <p> FAQ</p>
                              </blockquote>
                              <div
                                className="image_custom"
                                dangerouslySetInnerHTML={{
                                  __html: dataItem.faq,
                                }}
                              ></div>
                            </div>
                          </article>
                        </div>

                        <div className="col-md-12">
                          <div className="aa-blog-post-tag">
                            <ul>
                              <li>TAGES:</li>
                              <li>
                                <Link to="">POPERTY,</Link>
                              </li>
                              <li>
                                <Link to="">LAND,</Link>
                              </li>
                              <li>
                                <Link to="">FLAT,</Link>
                              </li>
                              <li>
                                <Link to="">RENT,</Link>
                              </li>
                              <li>
                                <Link to="">SALE,</Link>
                              </li>
                              <li>
                                <Link to="">OFFICE</Link>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="aa-properties-social">
                            <ul>
                              <li>Share</li>
                              <li>
                                <Link to="">
                                  <i className="fa fa-facebook"></i>
                                </Link>
                              </li>
                              <li>
                                <Link to="">
                                  <i className="fa fa-twitter"></i>
                                </Link>
                              </li>
                              <li>
                                <Link to="">
                                  <i className="fa fa-google-plus"></i>
                                </Link>
                              </li>
                              <li>
                                <Link to="">
                                  <i className="fa fa-pinterest"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>

                        

                        <div className="col-md-12">
                          <div className="aa-blog-related-post">
                            <div className="aa-title">
                              <h2>D??? ??n m???i nh???t</h2>
                              <span></span>
                            </div>
                            <div className="aa-blog-related-post-area">
                              <div className="row">
                                {suggest &&
                                  suggest.map((item, key) => (
                                    <div key={key} className="col-md-6 col-sm-6">
                                      <article className="aa-blog-single">
                                        <figure className="aa-blog-img">
                                          <Link to={"/project/" + item.slug}>
                                            <img
                                              src={item.thumb}
                                              alt="img"
                                            />
                                          </Link>
                                          <span className="aa-date-tag">
                                            {item.createdAt}
                                          </span>
                                        </figure>
                                        <div className="aa-blog-single-content">
                                          <h3>
                                            <Link to="">
                                              {item.name}.
                                            </Link>
                                          </h3>
                                          <p>
                                           {item.title}
                                          </p>
                                          <div className="aa-blog-single-bottom">
                                            <Link
                                              to=""
                                              className="aa-blog-author"
                                            >
                                              <i className="fa fa-user"></i>{" "}
                                              {item.address}
                                            </Link>
                                            <Link
                                              to=""
                                              className="aa-blog-comments"
                                            >
                                              <i className="fa fa-comment-o"></i>
                                              {item.price_rent}
                                            </Link>
                                          </div>
                                        </div>
                                      </article>
                                    </div>
                                  ))}

                                
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="aa-comments-area">
                            <h3>{dataItem ? dataItem.comment.length : 0} B??nh lu???n</h3>
                            {dataItem && <div className="comments">
                              <ul className="commentlist">
                                {dataItem.comment.map((item, key) => (
                                  <li key={key}>
                                  <div className="media">
                                    <div className="media-left">
                                      <img
                                        alt="img"
                                        src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
                                        className="media-object news-img"
                                      />
                                    </div>
                                    <div className="media-body">
                                      <h4 className="author-name">
                                        {item.name}
                                      </h4>
                                      <span className="comments-date">
                                        {" "}
                                        {item.createdAt}
                                      </span>
                                      <p>
                                        {item.content}
                                      </p>
                                    
                                    </div>
                                  </div>
                                </li>
                                ))}
                                
                              
                              </ul>

                             {/* <nav>
                                <ul className="pagination comments-pagination">
                                  <li>
                                    <Link aria-label="Previous" to="">
                                      <span aria-hidden="true">??</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="">1</Link>
                                  </li>
                                  <li>
                                    <Link to="">2</Link>
                                  </li>
                                  <li>
                                    <Link to="">3</Link>
                                  </li>
                                  <li>
                                    <Link to="">4</Link>
                                  </li>
                                  <li>
                                    <Link to="">5</Link>
                                  </li>
                                  <li>
                                    <Link aria-label="Next" to="">
                                      <span aria-hidden="true">??</span>
                                    </Link>
                                  </li>
                                </ul>
                              </nav> */}
                            </div>}
                            
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div id="respond">
                            <h3 className="reply-title">B??nh lu???n</h3>
                            <form id="commentform">
                              <p className="comment-notes">
                                Kh??ng ????? tr???ng 
                                <span className="required">*</span>
                              </p>
                             
                             {!checkUser.isLogin && <div>
                              
                              <p className="comment-form-author">
                                <label htmlFor="author">
                                  Name <span className="required">*</span>
                                </label>
                                <input
                                  type="text"
                                  required="required"
                                  size="30"
                                  onChange={(e) => setName(e.target.value)}
                                  value={name}
                                />
                              </p>
                              <p className="comment-form-email">
                                <label htmlFor="email">
                                  Email <span className="required">*</span>
                                </label>
                                <input
                                  type="email"
                                  required="required"
                                  aria-required="true"
                                  onChange={(e) => setEmail(e.target.value)}
                                  value={email}
                                />
                              </p>
                              
                              </div>}
                              <p className="comment-form-comment">
                                <label htmlFor="comment">N???i dung</label>
                                <textarea
                                  required="required"
                                  aria-required="true"
                                  rows="8"
                                  cols="45"
                                  value={content}
                                  onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                              </p>
                              
                              <p    onClick={() => postComment()} className="form-submit">
                                <input
                             
                                  type="button"
                                  value="G???i b??nh lu???n"
                                  className="aa-browse-btn"
                                  name="submit"
                                />
                              </p>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <aside className="aa-blog-sidebar">
                     
                      <div id="aa-properties">
                        <div className="aa-properties-sidebar">
                          <div className="aa-properties-single-sidebar">
                          <SearchComponent />
                          </div>
                        </div>
                      </div>
                  
                      <div className="aa-blog-sidebar-single">
                      
                        <h3>D??? ??n m???i nh???t</h3>
                        <div className="aa-blog-recent-post">
                          {suggest &&
                            suggest.map((item, key) => (
                              <div key={key} className="media">
                                <div className="media-left">
                                  <Link to={"/project/" + item.slug}>
                                    <img
                                      alt="img"
                                      src={item.thumb}
                                      className="media-object"
                                    />
                                  </Link>
                                </div>
                                <div className="media-body">
                                  <h4 className="media-heading">
                                    <Link to={"/project/" + item.slug}>{item.name}</Link>
                                  </h4>
                                  <p>{item.title}</p>
                                  <span>{item.address}</span>
                                </div>
                              </div>
                            ))}

                        </div>
                      </div>

                      <div className="aa-blog-sidebar-single">
                        <div className="aa-banner-ads">
                          <Link to="">
                            <img src="https://inanaz.com.vn/wp-content/uploads/2020/02/background-bat-dong-san-1.jpg" alt="banner img" />
                          </Link>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ProjectDetail;
