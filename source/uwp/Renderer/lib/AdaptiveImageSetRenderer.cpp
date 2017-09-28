#include "pch.h"

#include "AdaptiveImageSetRenderer.h"
#include "enums.h"
#include "Util.h"

using namespace Microsoft::WRL;
using namespace Microsoft::WRL::Wrappers;
using namespace ABI::AdaptiveCards::XamlCardRenderer;
using namespace ABI::Windows::Foundation;

namespace AdaptiveCards { namespace XamlCardRenderer
{
    HRESULT AdaptiveImageSetRenderer::RuntimeClassInitialize() noexcept try
    {
        return S_OK;
    } CATCH_RETURN;

    _Use_decl_annotations_
    HRESULT AdaptiveImageSetRenderer::Render(
        IAdaptiveCardElement* cardElement,
        IAdaptiveRenderContext* renderContext,
        ABI::Windows::UI::Xaml::IUIElement** result)
    {
        return S_OK;
    }
}}