import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import artImg from '@/assets/art.jpg';
import communityImg from '@/assets/community.jpg';
import educationImg from '@/assets/education.jpg';
import foodImg from '@/assets/food.jpg';
import musicImg from '@/assets/music.jpg';
import sportsImg from '@/assets/sports.jpg';

// Helper to map DB image name to local import
const getCategoryImage = (imageName) => {
    switch (imageName) {
        case 'art.jpg': return artImg;
        case 'community.jpg': return communityImg;
        case 'education.jpg': return educationImg;
        case 'food.jpg': return foodImg;
        case 'music.jpg': return musicImg;
        case 'sports.jpg': return sportsImg;
        default: return musicImg; // fallback
    }
};

const getCategoryColor = (categoryName) => {
    // Figma shows orange for 'Âm nhạc' (Music)
    if (categoryName === 'Music' || categoryName === 'Âm nhạc') return 'bg-[#F05A4A] text-white';
    return 'bg-[#BCE2CD] text-slate-800'; // Default mint badge
};

const EventDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useAuthStore();
    // const token = useAuthStore((state) => state.token);
    const [event, setEvent] = useState(null);
    const [userRegistration, setUserRegistration] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [registering, setRegistering] = useState(false);
    const [submittingReview, setSubmittingReview] = useState(false);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
                const response = await axios.get(`http://localhost:8000/api/events/${id}`, config);
                setEvent(response.data.data);
                setUserRegistration(response.data.user_registration || null);
            } catch (err) {Z
                console.error("Error fetching event details", err);
                setError(err.response?.data?.message || "Không thể tải dữ liệu sự kiện.");
            } finally {
                setLoading(false);
            }
        };

        // Initial fetch
        fetchEvent();

        // Polling every 3 seconds for real-time updates
        const intervalId = setInterval(() => {
            fetchEvent();
        }, 3000);

        return () => clearInterval(intervalId);
    }, [id, token]);

    const handleRegister = async () => {
        setRegistering(true);
        try {
            if (!token) {
                alert("Vui lòng đăng nhập để đăng ký tham gia!");
                setRegistering(false);
                return;
            }
            const response = await axios.post(`http://localhost:8000/api/events/${id}/register`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert(response.data.message || "Đăng ký thành công!");
            // reload data
            const res = await axios.get(`http://localhost:8000/api/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvent(res.data.data);
            setUserRegistration(res.data.user_registration || null);
        } catch (error) {
            alert(error.response?.data?.message || "Đã có lỗi xảy ra");
        } finally {
            setRegistering(false);
        }
    };

    const handleSubmitReview = async () => {
        if (rating === 0 || !comment.trim()) {
            alert("Vui lòng chọn số sao và nhập nội dung bình luận!");
            return;
        }
        
        setSubmittingReview(true);
        try {
            if (!token) {
                alert("Vui lòng đăng nhập để bình luận!");
                setSubmittingReview(false);
                return;
            }
            
            await axios.post(`http://localhost:8000/api/events/${id}/reviews`, {
                rating,
                comment
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            alert("Gửi bình luận thành công!");
            setComment('');
            setRating(0);
            
            // reload data
            const res = await axios.get(`http://localhost:8000/api/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvent(res.data.data);
            setUserRegistration(res.data.user_registration || null);
        } catch (error) {
            alert(error.response?.data?.message || "Đã có lỗi xảy ra");
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#fdfaf2]">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center bg-[#fdfaf2] text-red-500 font-medium">{error}</div>;
    if (!event) return <div className="min-h-screen flex items-center justify-center bg-[#fdfaf2]">Event not found</div>;

    const bannerImg = event.category ? getCategoryImage(event.category.image) : musicImg;
    const catName = event.category ? event.category.name : 'Sự kiện';
    
    const startDate = new Date(event.start_time);
    const deadlineDate = new Date(event.registration_deadline);
    const formatDate = (date) => `${date.getDate()} tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
    const formatTime = (date) => `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    
    const registeredCount = event.registrations ? event.registrations.length : 0;
    const remainingSpots = event.capacity - registeredCount;

    // Generate Initials
    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.split(' ');
        if (parts.length >= 2) return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    const avatarColors = ['#fca5a5', '#60a5fa', '#c084fc', '#fcd34d'];

    // Registration and Rating Computations
    const isRegistered = event && event.registrations && user && 
        event.registrations.some(reg => String(reg.user?.id || '') === String(user.id));

    const reviewsCount = event && event.reviews ? event.reviews.length : 0;
    const avgRating = event && event.reviews && reviewsCount > 0 
        ? (event.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount).toFixed(1) 
        : null;

    return (
        <div className="min-h-screen bg-[#EBEFEA] font-sans">
            {/* Top Navigation Bar / Banner Area */}
            <div className="relative w-full h-[300px] md:h-[400px]">
                <img src={bannerImg} alt="Event Banner" className="w-full h-full object-cover" />
                <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
                     {/* Giả định có header chung, ta thêm nút Quay lại ở đây */}
                     <button onClick={() => navigate(-1)} className="text-white border border-white rounded-full px-4 py-1 text-sm hover:bg-white/20 transition backdrop-blur-sm flex items-center gap-2">
                        <span>&lt;</span> Quay lại
                     </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    
                    {/* Left Column - Details */}
                    <div className="w-full lg:w-2/3 space-y-6">
                        {/* Detail Card */}
                        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-10">
                            <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${getCategoryColor(catName)}`}>
                                {catName}
                            </span>
                            
                            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-8">{event.title}</h1>
                            
                            {avgRating && (
                                <div className="flex items-center gap-1.5 -mt-6 mb-8 text-slate-700 font-semibold bg-amber-50 px-4 py-2 rounded-2xl w-fit border border-amber-200">
                                    <svg className="w-5 h-5 text-amber-500 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <span className="text-lg font-bold text-slate-800">{avgRating}</span>
                                    <span className="text-slate-500 text-sm font-medium">({reviewsCount} đánh giá)</span>
                                </div>
                            )}
                            
                            <div className="flex flex-col sm:flex-row gap-6 mb-10">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Ngày & giờ</p>
                                        <p className="font-semibold text-slate-800">{formatDate(startDate)} - {formatTime(startDate)}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3 sm:ml-8">
                                    <div className="mt-1">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Địa điểm</p>
                                        <p className="font-semibold text-slate-800">{event.location}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-slate-800 mb-4">Giới thiệu sự kiện</h2>
                                <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                                    {event.description}
                                </div>
                            </div>
                            
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 mb-4">Người tham gia</h2>
                                <div className="flex items-center">
                                    <div className="flex -space-x-3">
                                        {event.registrations && event.registrations.slice(0, 5).map((reg, idx) => (
                                            <div key={idx} className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-slate-800" style={{ backgroundColor: avatarColors[idx % avatarColors.length] }}>
                                                {getInitials(reg.user.name)}
                                            </div>
                                        ))}
                                        {registeredCount > 5 && (
                                            <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-slate-800">
                                                +{registeredCount - 5}
                                            </div>
                                        )}
                                    </div>
                                    <span className="ml-4 text-sm text-gray-500">đang tham dự</span>
                                </div>
                            </div>
                        </div>

                        {/* Comments Card */}
                        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-10 border border-[#fef3c7]">
                            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                                <h2 className="text-xl font-bold text-slate-800">Bình luận ({reviewsCount})</h2>
                                {avgRating && (
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className={`w-4 h-4 ${i < Math.round(Number(avgRating)) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        ))}
                                        <span className="text-sm font-bold text-slate-700 ml-1">{avgRating}/5</span>
                                    </div>
                                )}
                            </div>
                            
                            {!token ? (
                                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center mb-8">
                                    <p className="text-slate-600 font-medium mb-3">Vui lòng đăng nhập để bình luận và đánh giá sự kiện.</p>
                                    <button onClick={() => navigate('/login')} className="bg-slate-800 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-slate-700 transition">Đăng nhập ngay</button>
                                </div>
                            ) : !isRegistered ? (
                                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center mb-8">
                                    <svg className="w-8 h-8 text-amber-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                    </svg>
                                    <p className="text-amber-800 font-semibold mb-1">Quyền đánh giá bị giới hạn</p>
                                    <p className="text-amber-700 text-sm">Bạn cần đăng ký tham gia và được chấp nhận vào sự kiện này trước khi có thể gửi bình luận đánh giá.</p>
                                </div>
                            ) : (
                                <>
                                    {/* Star Rating Selection */}
                                    <div className="flex gap-2 mb-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
                                                <svg className={`w-8 h-8 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                            </button>
                                        ))}
                                    </div>
                                    
                                    <textarea 
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Nhập bình luận của bạn..."
                                        className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#BCE2CD] resize-none mb-4"
                                        rows="3"
                                    ></textarea>
                                    <div className="flex justify-end">
                                        <button 
                                            onClick={handleSubmitReview}
                                            disabled={submittingReview}
                                            className="bg-slate-800 text-white px-6 py-2 rounded-xl hover:bg-slate-700 transition disabled:opacity-50"
                                        >
                                            {submittingReview ? 'Đang gửi...' : 'Gửi bình luận'}
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Existing Comments */}
                            <div className="mt-8 space-y-6">
                                {event.reviews && event.reviews.map((rev, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-slate-800 shrink-0" style={{ backgroundColor: avatarColors[idx % avatarColors.length] }}>
                                            {getInitials(rev.user?.name)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold text-slate-800">{rev.user?.name || 'Người dùng'}</h4>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className={`w-3 h-3 ${i < rev.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm">{rev.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Registration Summary Card */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 sticky top-24 border border-[#BCE2CD]">
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                    <span className="text-gray-500 text-sm">Trạng thái sự kiện:</span>
                                    <span className="text-green-600 font-semibold">{event.status === 'published' ? 'Đang mở đăng ký' : 'Chưa mở'}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                    <span className="text-gray-500 text-sm">Sức chứa: {event.capacity} người</span>
                                    <span className="text-[#F05A4A] font-semibold text-sm">Còn {remainingSpots > 0 ? remainingSpots : 0} chỗ</span>
                                </div>
                                <div className="flex justify-between items-center pb-2">
                                    <span className="text-gray-500 text-sm">Hạn đăng ký:</span>
                                    <span className="text-slate-800 font-medium text-sm">{formatDate(deadlineDate)}</span>
                                </div>
                                {userRegistration && (
                                    <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-2">
                                        <span className="text-gray-500 text-sm">Đăng ký của bạn:</span>
                                        {userRegistration.status === 'approved' && (
                                            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
                                                Chính thức
                                            </span>
                                        )}
                                        {userRegistration.status === 'pending' && (
                                            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200">
                                                Đang chờ duyệt
                                            </span>
                                        )}
                                        {userRegistration.status === 'cancelled' && (
                                            <span className="bg-rose-100 text-rose-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-rose-200">
                                                Đã hủy
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            {userRegistration ? (
                                <button 
                                    disabled={true}
                                    className="w-full py-4 rounded-xl font-semibold text-lg bg-gray-200 text-gray-500 cursor-not-allowed"
                                >
                                    {userRegistration.status === 'approved' && 'Đã đăng ký chính thức'}
                                    {userRegistration.status === 'pending' && 'Đang ở hàng chờ'}
                                    {userRegistration.status === 'cancelled' && 'Đăng ký đã bị hủy'}
                                </button>
                            ) : (
                                <button 
                                    onClick={handleRegister}
                                    disabled={registering || (new Date() > deadlineDate)}
                                    className={`w-full py-4 rounded-xl font-semibold text-lg transition ${
                                        new Date() > deadlineDate
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : remainingSpots <= 0 
                                          ? 'bg-[#F05A4A] text-white hover:bg-[#d84e3f]'
                                          : 'bg-[#BCE2CD] text-slate-800 hover:bg-[#a6d1b8]'
                                    }`}
                                >
                                    {registering 
                                        ? 'Đang xử lý...' 
                                        : (new Date() > deadlineDate)
                                          ? 'Hết hạn đăng ký'
                                          : (remainingSpots > 0 ? 'Đăng ký tham gia' : 'Đăng ký vào hàng chờ')
                                    }
                                </button>
                            )}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default EventDetailPage;
